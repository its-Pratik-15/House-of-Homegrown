const prisma = require('../../prisma/prismaClient');

class ProductService {
  async getAllProducts(filters = {}) {
    try {
      const { category, type, limit } = filters;
      
      let whereClause = {};
      let orderBy = { createdAt: 'desc' };
      
      // Filter by category
      if (category) {
        const categoryRecord = await prisma.category.findFirst({
          where: { type: category.toUpperCase() }
        });
        if (categoryRecord) {
          whereClause.categoryId = categoryRecord.id;
        } else {
          // Category provided but not found - return empty results
          return [];
        }
      }
      
      // Filter by type (trending)
      if (type === 'trending') {
        whereClause.inventory = {
          soldCount: { gte: 3 }
        };
        orderBy = { inventory: { soldCount: 'desc' } };
      }
      
      const products = await prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
          images: {
            orderBy: { position: 'asc' }
          },
          inventory: true
        },
        orderBy,
        take: limit ? parseInt(limit) : undefined
      });
      
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }
  
  async getProductBySlug(slug) {
    try {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          images: {
            orderBy: { position: 'asc' }
          },
          inventory: true
        }
      });
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product;
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }
}

module.exports = new ProductService();