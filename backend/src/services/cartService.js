const prisma = require('../../prisma/prismaClient');

class CartService {
  async getUserCart(userId) {
    try {
      let cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    orderBy: { position: 'asc' },
                    take: 1
                  }
                }
              }
            }
          }
        }
      });
      
      // Create cart if doesn't exist
      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    images: {
                      orderBy: { position: 'asc' },
                      take: 1
                    }
                  }
                }
              }
            }
          }
        });
      }
      
      return cart;
    } catch (error) {
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  }
  
  async addItemToCart(userId, productId, quantity, priceAtTime) {
    try {
      const cart = await this.getUserCart(userId);
      
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
        // Update quantity
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
          include: {
            product: {
              include: {
                images: {
                  orderBy: { position: 'asc' },
                  take: 1
                }
              }
            }
          }
        });
        return updatedItem;
      } else {
        // Create new item
        const newItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            priceAtTime
          },
          include: {
            product: {
              include: {
                images: {
                  orderBy: { position: 'asc' },
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
  
  async updateCartItem(itemId, quantity) {
    try {
      const updatedItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: {
          product: {
            include: {
              images: {
                orderBy: { position: 'asc' },
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
  
  async removeCartItem(itemId) {
    try {
      await prisma.cartItem.delete({
        where: { id: itemId }
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to remove cart item: ${error.message}`);
    }
  }
}

module.exports = new CartService();