const prisma = require('../../prisma/prismaClient');

class ProductService {
  async getAllProducts(filters = {}) {
    try {
      const { category, categoryId, type, limit, search, sortBy, page } = filters;
      
      let whereClause = {};
      let orderBy = { createdAt: 'desc' };
      
      // Filter by categoryId (direct ID)
      if (categoryId) {
        whereClause.categoryId = parseInt(categoryId);
      }
      // Filter by category type (fallback for existing functionality)
      else if (category) {
        const categoryRecord = await prisma.category.findFirst({
          where: { type: category.toUpperCase() }
        });
        if (categoryRecord) {
          whereClause.categoryId = categoryRecord.id;
        } else {
          // Category provided but not found - return empty results
          return {
            products: [],
            totalPages: 0,
            currentPage: 1,
            totalCount: 0
          };
        }
      }
      
      // Search functionality
      if (search) {
        whereClause.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } },
          { longDescription: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } }
        ];
      }
      
      // Sorting
      if (sortBy) {
        switch (sortBy) {
          case 'price':
            orderBy = { price: 'asc' };
            break;
          case 'name':
            orderBy = { title: 'asc' };
            break;
          case 'createdAt':
            orderBy = { createdAt: 'desc' };
            break;
          default:
            orderBy = { createdAt: 'desc' };
        }
      }
      
      // Filter by type (trending) - handle inventory relation properly
      if (type === 'trending') {
        whereClause.inventory = {
          soldCount: { gte: 3 }
        };
        orderBy = { 
          inventory: { 
            soldCount: 'desc' 
          } 
        };
      }
      
      // Pagination
      const pageNum = page ? parseInt(page) : 1;
      const limitNum = limit ? parseInt(limit) : 12;
      const skip = (pageNum - 1) * limitNum;
      
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
        skip,
        take: limitNum
      });
      
      // Get total count for pagination
      const totalCount = await prisma.product.count({
        where: whereClause
      });
      
      return {
        products,
        totalPages: Math.ceil(totalCount / limitNum),
        currentPage: pageNum,
        totalCount
      };
    } catch (error) {
      console.error('ProductService error:', error);
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

  async getProductById(id) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
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