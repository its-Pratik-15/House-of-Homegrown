const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Category: WELLNESS
    const wellnessCategory = await prisma.category.upsert({
        where: { type: "WELLNESS" },
        update: {},
        create: {
            type: "WELLNESS",
        },
    });

    // Category: HOME_LIVING
    const homeLivingCategory = await prisma.category.upsert({
        where: { type: "HOME_LIVING" },
        update: {},
        create: {
            type: "HOME_LIVING",
        },
    });

    // Category: LIFESTYLE
    const lifestyleCategory = await prisma.category.upsert({
        where: { type: "LIFESTYLE" },
        update: {},
        create: {
            type: "LIFESTYLE",
        },
    });

    // Category: TEXTILES
    const textilesCategory = await prisma.category.upsert({
        where: { type: "TEXTILES" },
        update: {},
        create: {
            type: "TEXTILES",
        },
    });

    // Product: Solid Shampoo / Conditioner Bar
    const shampooBar = await prisma.product.create({
        data: {
            title: "Argila Branca Shoap Bar",
            slug: "argila-branca-shoap-bar",
            shortDescription: "Natural solid shampoo bar for oily hair",
            longDescription: "A sustainable shampoo bar made with green clay and rosemary oil. Ideal for oily scalp, plastic-free and travel-friendly.",
            price: 399,
            mrp: 499,
            brand: "JassBotanic",
            categoryId: wellnessCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957194/soap_o0czow.webp",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 100,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Product: Body Wash
    const bodyWash = await prisma.product.create({
        data: {
            title: "Bergamot & Hinoki Body Wash",
            slug: "bergamot-hinoki-body-wash",
            shortDescription: "Gentle body wash with calming botanical notes",
            longDescription: "A mild daily body wash infused with bergamot and hinoki for a calming, spa-like experience. Suitable for all skin types.",
            price: 699,
            mrp: 799,
            brand: "Salt & Stone",
            categoryId: wellnessCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957194/body-wash_nbd4ll.webp",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 80,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Soy Wax Candle
    await prisma.product.create({
        data: {
            title: "After Hours Soy Wax Candle",
            slug: "after-hours-soy-wax-candle",
            shortDescription: "Luxury soy wax candle for calm evenings",
            longDescription: "A premium coconut & soy wax candle designed for slow evenings. Clean burn, subtle fragrance, and elegant glass packaging.",
            price: 1299,
            mrp: 1499,
            brand: "Delilah",
            categoryId: homeLivingCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957195/soy-wax-candel_homj9z.webp",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 50,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Almond Hair Oil
    await prisma.product.create({
        data: {
            title: "Almond Hair Oil with Vitamin E",
            slug: "almond-hair-oil-vitamin-e",
            shortDescription: "Non-sticky almond hair oil for daily nourishment",
            longDescription: "Lightweight almond hair oil enriched with Vitamin E to reduce hair fall and add natural shine without greasiness.",
            price: 199,
            mrp: 220,
            brand: "Bajaj",
            categoryId: wellnessCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957038/oil_xxhcw5.webp",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 200,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Eco Tote Bag
    await prisma.product.create({
        data: {
            title: "Reusable Eco Tote Bag",
            slug: "reusable-eco-tote-bag",
            shortDescription: "Sustainable everyday carry tote",
            longDescription: "Minimalist reusable tote bag made for daily errands. Durable, lightweight, and eco-friendly.",
            price: 299,
            mrp: 349,
            brand: "Homegrown",
            categoryId: lifestyleCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957159/tote_bag_rd5wiz.webp",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 120,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Stainless Steel Water Bottle – White
    await prisma.product.create({
        data: {
            title: "Insulated Stainless Steel Water Bottle (White)",
            slug: "insulated-stainless-steel-water-bottle-white",
            shortDescription: "Minimal insulated bottle for everyday hydration",
            longDescription: "Double-walled stainless steel water bottle designed to keep drinks cold or hot for hours. Leak-proof lid with carry loop, perfect for daily use and workouts.",
            price: 999,
            mrp: 1199,
            brand: "Homegrown",
            categoryId: lifestyleCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957129/stell_water_bootel_2_mb11wl.webp", 
                    position: 0 
                }], // intentionally blank
            },
            inventory: {
                create: {
                    stockQuantity: 150,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Stainless Steel Water Bottle – Black
    await prisma.product.create({
        data: {
            title: "Insulated Stainless Steel Water Bottle (Black)",
            slug: "insulated-stainless-steel-water-bottle-black",
            shortDescription: "Sleek matte black insulated bottle",
            longDescription: "Premium insulated stainless steel bottle with a matte black finish. Keeps beverages at ideal temperature and fits easily in backpacks and gym bags.",
            price: 999,
            mrp: 1199,
            brand: "Homegrown",
            categoryId: lifestyleCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957840/black-bottel_yo5xkx.jpg", 
                    position: 0 
                }], 
            },
            inventory: {
                create: {
                    stockQuantity: 150,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // 🍽️ Minimal Ceramic Dinner Plate
    await prisma.product.create({
        data: {
            title: "Minimal Ceramic Dinner Plate",
            slug: "minimal-ceramic-dinner-plate",
            shortDescription: "Handcrafted ceramic plate with a natural finish",
            longDescription: "Elegant ceramic dinner plate with a soft matte texture. Designed for everyday meals and modern table settings.",
            price: 699,
            mrp: 849,
            brand: "Studio Clay",
            categoryId: homeLivingCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957961/eramic_plate_bwze8e.webp", 
                    position: 0 
                }], 
            },
            inventory: {
                create: {
                    stockQuantity: 80,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    console.log("Seeding completed successfully!");
    console.log(`Created categories: WELLNESS, HOME_LIVING, LIFESTYLE, TEXTILES`);
    console.log(`Created 8 products with inventory data`);
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });