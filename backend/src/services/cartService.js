const prisma = require('../../prisma/prismaClient');

class CartService {
  async getUserCart(userId) {
    try {
      let cart = await prisma.cart.findFirst({
        where: { userId },
        select: {
          id: true,
          userId: true,
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
          data: { userId },
          select: {
            id: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            items: true
          }
        });
      }

      return cart;
    } catch (error) {
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  }

  async addItemToCart(userId, productId, quantity) {
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
        // Check if total new quantity exceeds stock
        if (product.inventory.stockQuantity < existingItem.quantity + quantity) {
           throw new Error(`Insufficient stock. Available: ${product.inventory.stockQuantity}`);
        }

        // Update existing item quantity
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity }
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
        data: { quantity }
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