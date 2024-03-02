const prisma = require('../../prisma/prismaClient');

class CategoryService {
  async getAllCategories() {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { products: true }
          }
        }
      });
      return categories;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();