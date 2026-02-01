const prisma = require('../../prisma/prismaClient');

class CartService {
  async getUserCart(identifier, isGuest = false) {
    try {
      let cart;
      
      if (isGuest) {
        // For guest users, use guestId to find cart
        cart = await prisma.cart.findFirst({
          where: { guestId: identifier },
          select: {
            id: true,
            userId: true,
            guestId: true,
            createdAt: true,
            updatedAt: true,
            items: {
              orderBy: { id: 'desc' },
              select: {
                id: true,
                quantity: true,
                priceAtTime: true,
                product: {
                  select: {
                    id: true,
                    title: true,
                    slug: true,
                    price: true,
                    images: {
                      where: { position: 0 },
                      select: { url: true },
                      take: 1
                    }
                  }
                }
              }
            }
          }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { guestId: identifier },
            select: {
              id: true,
              userId: true,
              guestId: true,
              createdAt: true,
              updatedAt: true,
              items: true
            }
          });
        }
      } else {
        // For registered users, use userId
        cart = await prisma.cart.findFirst({
          where: { userId: identifier },
          select: {
            id: true,
            userId: true,
            guestId: true,
            createdAt: true,
            updatedAt: true,
            items: {
              orderBy: { id: 'desc' },
              select: {
                id: true,
                quantity: true,
                priceAtTime: true,
                product: {
                  select: {
                    id: true,
                    title: true,
                    slug: true,
                    price: true,
                    images: {
                      where: { position: 0 },
                      select: { url: true },
                      take: 1
                    }
                  }
                }
              }
            }
          }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { userId: identifier },
            select: {
              id: true,
              userId: true,
              guestId: true,
              createdAt: true,
              updatedAt: true,
              items: true
            }
          });
        }
      }

      return cart;
    } catch (error) {
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  }

  async addItemToCart(identifier, productId, quantity, isGuest = false) {
    try {
      // Fetch product to get real price and check inventory
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { inventory: true }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      if (!product.inventory || product.inventory.stockQuantity < quantity) {
        throw new Error(`Insufficient stock. Available: ${product.inventory?.stockQuantity || 0}`);
      }

      const cart = await this.getUserCart(identifier, isGuest);
      
      // Check if item already exists
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId
          }
        }
      });
      
      if (existingItem) {
        // Check if total new quantity exceeds stock
        if (product.inventory.stockQuantity < existingItem.quantity + quantity) {
           throw new Error(`Insufficient stock. Available: ${product.inventory.stockQuantity}`);
        }

        // Update existing item quantity
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                price: true,
                images: {
                  where: { position: 0 },
                  select: { url: true },
                  take: 1
                }
              }
            }
          }
        });
        return updatedItem;
      } else {
        // Create new item using REAL price
        const newItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            priceAtTime: product.price // Use source of truth
          },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                price: true,
                images: {
                  where: { position: 0 },
                  select: { url: true },
                  take: 1
                }
              }
            }
          }
        });
        return newItem;
      }
    } catch (error) {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }
  }

  async updateCartItem(itemId, quantity, identifier, isGuest = false) {
    try {
      // Verify the cart item belongs to the user/guest
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
          cart: true,
          product: {
            include: { inventory: true }
          }
        }
      });

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      // Verify ownership
      if (isGuest && cartItem.cart.guestId !== identifier) {
        throw new Error('Unauthorized access to cart item');
      } else if (!isGuest && cartItem.cart.userId !== identifier) {
        throw new Error('Unauthorized access to cart item');
      }

      // Check inventory
      if (cartItem.product.inventory && cartItem.product.inventory.stockQuantity < quantity) {
        throw new Error(`Insufficient stock. Available: ${cartItem.product.inventory.stockQuantity}`);
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: {
          product: {
            select: {
              id: true,
              title: true,
              slug: true,
              price: true,
              images: {
                where: { position: 0 },
                select: { url: true },
                take: 1
              }
            }
          }
        }
      });
      return updatedItem;
    } catch (error) {
      throw new Error(`Failed to update cart item: ${error.message}`);
    }
  }

  async removeCartItem(itemId, identifier, isGuest = false) {
    try {
      // Verify the cart item belongs to the user/guest
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true }
      });

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      // Verify ownership
      if (isGuest && cartItem.cart.guestId !== identifier) {
        throw new Error('Unauthorized access to cart item');
      } else if (!isGuest && cartItem.cart.userId !== identifier) {
        throw new Error('Unauthorized access to cart item');
      }

      await prisma.cartItem.delete({
        where: { id: itemId }
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to remove cart item: ${error.message}`);
    }
  }

  async clearCart(identifier, isGuest = false) {
    try {
      const cart = await this.getUserCart(identifier, isGuest);
      
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to clear cart: ${error.message}`);
    }
  }

  // Method to migrate guest cart to user cart when user logs in
  async migrateGuestCartToUser(guestId, userId) {
    try {
      const guestCart = await prisma.cart.findFirst({
        where: { guestId },
        include: { items: true }
      });

      if (!guestCart || guestCart.items.length === 0) {
        return { success: true, message: 'No guest cart to migrate' };
      }

      // Get or create user cart
      const userCart = await this.getUserCart(userId, false);

      // Move items from guest cart to user cart
      for (const item of guestCart.items) {
        // Check if item already exists in user cart
        const existingItem = await prisma.cartItem.findUnique({
          where: {
            cartId_productId: {
              cartId: userCart.id,
              productId: item.productId
            }
          }
        });

        if (existingItem) {
          // Update quantity
          await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + item.quantity }
          });
        } else {
          // Create new item in user cart
          await prisma.cartItem.create({
            data: {
              cartId: userCart.id,
              productId: item.productId,
              quantity: item.quantity,
              priceAtTime: item.priceAtTime
            }
          });
        }
      }

      // Delete guest cart
      await prisma.cart.delete({
        where: { id: guestCart.id }
      });

      return { success: true, message: 'Guest cart migrated successfully' };
    } catch (error) {
      throw new Error(`Failed to migrate guest cart: ${error.message}`);
    }
  }
}

module.exports = new CartService();