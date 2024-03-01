# House of Homegrown - E-commerce

House of Homegrown is an Indian D2C brand inspired by "Roti, Kapda aur Makan", offering sustainable, natural, and Indian-made products across textiles, home & living, wellness, and lifestyle.


## ER Model

![ER Model Diagram](docs/images/er-model.png)

### Tables (Models in Prisma)

- **User** - Customer accounts with authentication fields (name, email, password, phone)
- **Category** - Product categories with enum types (TEXTILES, HOME_LIVING, WELLNESS, LIFESTYLE)
- **Product** - Product catalog with pricing, descriptions, brand information, and category relationships
- **ProductImage** - Multiple images per product with position ordering for display
- **Inventory** - Stock management with available and reserved quantities tracking
- **Cart** - Shopping cart functionality with timestamp tracking
- **CartItem** - Individual items in shopping carts with quantity and price snapshots

### Key Relationships

- **User to Cart**: One-to-Many (Users can have multiple carts for different purposes)
- **Category to Product**: One-to-Many (Each category contains multiple products)
- **Product to ProductImage**: One-to-Many (Products can have multiple images)
- **Product to Inventory**: One-to-One (Each product has dedicated inventory tracking)
- **Cart to CartItem**: One-to-Many (Carts contain multiple items)
- **Product to CartItem**: One-to-Many (Products can appear in multiple carts)

### Design Features

- **Price Tracking**: CartItem stores `priceAtTime` to preserve pricing when items are added to cart
- **Inventory Management**: Separate `stockQuantity` and `reservedQuantity` for better stock control
- **Flexible Images**: Multiple product images with position-based ordering
- **Cart Status**: Simple cart management with creation and update timestamps
- **Data Integrity**: Cascade deletes and unique constraints ensure data consistency

### Enums

**CategoryType**
- `TEXTILES` - Clothing, fabrics, and textile products
- `HOME_LIVING` - Home decor and living essentials
- `WELLNESS` - Health and wellness products
- `LIFESTYLE` - Lifestyle and personal care items


---

**House of Homegrown** - Supporting local artisans and sustainable living