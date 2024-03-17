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

    // Handwoven Linen Throw
    await prisma.product.create({
        data: {
            title: "Handwoven Linen Throw (Natural Charcoal)",
            slug: "handwoven-linen-throw-natural-charcoal",
            shortDescription: "Soft handwoven throw for everyday comfort",
            longDescription: "Artisan-made handwoven linen throw crafted from natural fibers. Breathable, lightweight, and perfect for layering on sofas, beds, or cozy evenings.",
            price: 2499,
            mrp: 2999,
            brand: "Homegrown",
            categoryId: textilesCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957061/handwooven-linen_hyaigh.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 60,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Handwoven Cane Storage Basket
    await prisma.product.create({
        data: {
            title: "Handwoven Cane Storage Basket",
            slug: "handwoven-cane-storage-basket",
            shortDescription: "Natural woven basket for mindful storage",
            longDescription: "Handcrafted cane storage basket designed for functional beauty. Ideal for organizing firewood, linens, or everyday essentials while adding warmth to your space.",
            price: 1899,
            mrp: 2299,
            brand: "Homegrown",
            categoryId: homeLivingCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957117/wooden_storage_m1doyu.webp",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 40,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Handcrafted Wooden Kitchen Utensil Set
    await prisma.product.create({
        data: {
            title: "Handcrafted Wooden Kitchen Utensil Set",
            slug: "handcrafted-wooden-kitchen-utensil-set",
            shortDescription: "Everyday wooden tools for conscious cooking",
            longDescription: "A thoughtfully curated set of handcrafted wooden kitchen utensils. Gentle on cookware, durable, and made from natural wood for everyday Indian kitchens.",
            price: 1599,
            mrp: 1999,
            brand: "Homegrown",
            categoryId: homeLivingCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1769957074/wooden-products_v8hnqr.jpg",
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

    // Organic Cotton Kitchen Towels
    await prisma.product.create({
        data: {
            title: "Organic Cotton Kitchen Towels (Set of 2)",
            slug: "organic-cotton-kitchen-towels",
            shortDescription: "Soft, absorbent towels for everyday kitchen use",
            longDescription: "Made from organic cotton with a natural weave. Highly absorbent, quick-drying, and designed for everyday Indian kitchens.",
            price: 699,
            mrp: 799,
            brand: "Homegrown",
            categoryId: textilesCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035432/kitchen-towel_ludlvh.jpg",
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

    // Handloom Cotton Cushion Cover
    await prisma.product.create({
        data: {
            title: "Handloom Cotton Cushion Cover",
            slug: "handloom-cotton-cushion-cover",
            shortDescription: "Textured cotton cover for sofas and beds",
            longDescription: "Handloom-woven cotton cushion cover with subtle texture. Designed to blend into modern and traditional Indian homes.",
            price: 899,
            mrp: 999,
            brand: "Homegrown",
            categoryId: textilesCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035432/Handloom-Cushion-Cover_qkpzzz.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 90,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Minimal Stoneware Tea Mug
    await prisma.product.create({
        data: {
            title: "Minimal Stoneware Tea Mug",
            slug: "minimal-stoneware-tea-mug",
            shortDescription: "Everyday mug with a natural matte finish",
            longDescription: "Hand-finished stoneware mug designed for daily tea and coffee rituals. Comfortable grip and durable build.",
            price: 749,
            mrp: 849,
            brand: "Homegrown",
            categoryId: homeLivingCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035444/mug-stone_obzidg.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 140,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Solid Wood Cutlery Holder
    await prisma.product.create({
        data: {
            title: "Solid Wood Cutlery Holder",
            slug: "solid-wood-cutlery-holder",
            shortDescription: "Simple wooden holder for kitchen organization",
            longDescription: "Crafted from solid wood with a natural grain finish. Keeps everyday cutlery organized and accessible.",
            price: 1099,
            mrp: 1299,
            brand: "Homegrown",
            categoryId: homeLivingCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035444/cutlery_holder_uw08m2.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 85,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Herbal Body Wash
    await prisma.product.create({
        data: {
            title: "Herbal Body Wash",
            slug: "herbal-body-wash",
            shortDescription: "Mild body wash with herbal extracts",
            longDescription: "Gentle body wash formulated with herbal extracts for daily cleansing. Leaves skin feeling fresh without dryness.",
            price: 499,
            mrp: 599,
            brand: "Homegrown",
            categoryId: wellnessCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035592/_AD_-_PR__I_have_fallen_in_love_with_this_stunning_gift_set_from_bareandbloomuk_as_they_are_the_perfect_treat_for_the_skin_and_senses_alike_.._Bare_Bloom_s_latest_launch_is_my_go-to_for_luxury_gifting_wi_lhe9qe.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 160,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Lavender Essential Oil
    await prisma.product.create({
        data: {
            title: "Lavender Essential Oil",
            slug: "lavender-essential-oil",
            shortDescription: "Calming essential oil for relaxation",
            longDescription: "Pure lavender essential oil suitable for diffusers and mindful rituals. Known for its calming and soothing aroma.",
            price: 799,
            mrp: 899,
            brand: "Homegrown",
            categoryId: wellnessCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035432/levender-oil_oal4fe.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 70,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Stainless Steel Lunch Box
    await prisma.product.create({
        data: {
            title: "Stainless Steel Lunch Box",
            slug: "stainless-steel-lunch-box",
            shortDescription: "Durable lunch box for everyday meals",
            longDescription: "Food-grade stainless steel lunch box designed for daily office or school use. Easy to clean and long-lasting.",
            price: 1199,
            mrp: 1399,
            brand: "Homegrown",
            categoryId: lifestyleCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035431/luunch-box_tksiev.jpg",
                    position: 0,
                }],
            },
            inventory: {
                create: {
                    stockQuantity: 110,
                    reservedQuantity: 0,
                    soldCount: 0,
                },
            },
        },
    });

    // Reusable Cotton Face Towels
    await prisma.product.create({
        data: {
            title: "Reusable Cotton Face Towels",
            slug: "reusable-cotton-face-towels",
            shortDescription: "Soft towels for skincare routines",
            longDescription: "Reusable cotton face towels designed for gentle cleansing and skincare routines. Soft on skin and easy to wash.",
            price: 399,
            mrp: 499,
            brand: "Homegrown",
            categoryId: lifestyleCategory.id,
            images: {
                create: [{
                    url: "https://res.cloudinary.com/dilfeibvg/image/upload/v1770035432/face-towel_rwh6ve.jpg",
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

    console.log("Seeding completed successfully!");
    console.log(`Created categories: WELLNESS, HOME_LIVING, LIFESTYLE, TEXTILES`);
    console.log(`Created 19 products with inventory data`);
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });