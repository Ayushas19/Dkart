import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("P@ssword123", 10);

  // Clear existing data to prevent unique constraints or duplication issues
  console.log("Cleaning database...");
  await prisma.review.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.subCategory.deleteMany({});
  await prisma.mainCategory.deleteMany({});
  await prisma.shop.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Admin
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@districtkart.com",
      password,
      role: "ADMIN",
    },
  });

  // 2. Create Main Categories
  console.log("Creating main categories...");
  const clothingCat = await prisma.mainCategory.create({
    data: { name: "Clothing", icon: "👕", description: "Vibrant apparel and traditional wear" },
  });
  const sweetCat = await prisma.mainCategory.create({
    data: { name: "Sweets", icon: "🍬", description: "Fresh and delicious traditional sweets" },
  });
  const cakeCat = await prisma.mainCategory.create({
    data: { name: "Cake", icon: "🎂", description: "Premium cakes and delicious pastries" },
  });
  const restaurantCat = await prisma.mainCategory.create({
    data: { name: "Restaurant", icon: "🍛", description: "Top local foods and dynamic dishes" },
  });
  const cosmeticsCat = await prisma.mainCategory.create({
    data: { name: "Cosmetics", icon: "💄", description: "Skincare and premium cosmetics products" },
  });
  const hotelsCat = await prisma.mainCategory.create({
    data: { name: "Hotels", icon: "🏨", description: "Top-rated stays and hospitality" },
  });
  const pharmacyCat = await prisma.mainCategory.create({
    data: { name: "Pharmacy", icon: "💊", description: "Medicines and healthcare products" },
  });

  // 3. Create Users / Vendors
  console.log("Creating vendors...");
  const cakeVendor = await prisma.user.create({
    data: { name: "The Cake Studio Vendor", email: "cake@districtkart.com", password, role: "VENDOR", phone: "+91 91111 22222" },
  });
  const guptaVendor = await prisma.user.create({
    data: { name: "Gupta Sweets Vendor", email: "gupta@districtkart.com", password, role: "VENDOR", phone: "+91 91427 17690" },
  });
  const bengalVendor = await prisma.user.create({
    data: { name: "Bengali Sweets Vendor", email: "bengal@districtkart.com", password, role: "VENDOR", phone: "+91 92222 33333" },
  });
  const mishraVendor = await prisma.user.create({
    data: { name: "Mishra Sweets Vendor", email: "mishra@districtkart.com", password, role: "VENDOR", phone: "+91 93333 44444" },
  });
  const balajiVendor = await prisma.user.create({
    data: { name: "Shree Balaji Sweets Vendor", email: "balaji@districtkart.com", password, role: "VENDOR", phone: "+91 94444 55555" },
  });
  const styleVendor = await prisma.user.create({
    data: { name: "Style Point Vendor", email: "style@districtkart.com", password, role: "VENDOR", phone: "+91 95555 66666" },
  });
  const foodVendor = await prisma.user.create({
    data: { name: "Food Plaza Vendor", email: "food@districtkart.com", password, role: "VENDOR", phone: "+91 96666 77777" },
  });
  const beautyVendor = await prisma.user.create({
    data: { name: "Beauty Basket Vendor", email: "beauty@districtkart.com", password, role: "VENDOR", phone: "+91 97777 88888" },
  });

  // 4. Create Shops
  console.log("Creating shops...");
  const cakeShop = await prisma.shop.create({
    data: {
      name: "The Cake Studio",
      description: "Baked with love. Fresh premium cakes, cookies, and pastries.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: cakeVendor.id,
    },
  });

  const guptaShop = await prisma.shop.create({
    data: {
      name: "Gupta Sweets",
      description: "Soft & spongy sweets made from 100% fresh chhena and premium ingredients. Serving since 2015.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      whatsapp: "+919142717690",
      instagram: "gupta_sweets",
      facebook: "guptasweetspatna",
      vendorId: guptaVendor.id,
    },
  });

  const bengalShop = await prisma.shop.create({
    data: {
      name: "Bengali Sweets",
      description: "Authentic Bengali sweets and gourmet delicaies in Patna.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: bengalVendor.id,
    },
  });

  const mishraShop = await prisma.shop.create({
    data: {
      name: "Mishra Sweets",
      description: "Traditional sweets, laddoos, and namkeens.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: mishraVendor.id,
    },
  });

  const balajiShop = await prisma.shop.create({
    data: {
      name: "Shree Balaji Sweets",
      description: "Purity & taste in gulab jamuns and laddoos.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: balajiVendor.id,
    },
  });

  const styleShop = await prisma.shop.create({
    data: {
      name: "Style Point",
      description: "Exclusive collection of modern clothing and casual wear.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: styleVendor.id,
    },
  });

  const foodShop = await prisma.shop.create({
    data: {
      name: "Food Plaza",
      description: "Delicious local foods, snacks, and mouth-watering curries.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: foodVendor.id,
    },
  });

  const beautyShop = await prisma.shop.create({
    data: {
      name: "Beauty Basket",
      description: "Premium skincare, face cosmetics, and luxury facewashes.",
      status: "APPROVED",
      isActive: true,
      location: "Patna",
      vendorId: beautyVendor.id,
    },
  });

  // 5. Create Sub Categories scoped to shops
  console.log("Creating sub categories...");
  const cakeSub = await prisma.subCategory.create({
    data: { name: "Cakes", mainCategoryId: cakeCat.id, shopId: cakeShop.id },
  });
  const guptaSub = await prisma.subCategory.create({
    data: { name: "Sweets", mainCategoryId: sweetCat.id, shopId: guptaShop.id },
  });
  const bengalSub = await prisma.subCategory.create({
    data: { name: "Sweets", mainCategoryId: sweetCat.id, shopId: bengalShop.id },
  });
  const mishraSub = await prisma.subCategory.create({
    data: { name: "Sweets", mainCategoryId: sweetCat.id, shopId: mishraShop.id },
  });
  const balajiSub = await prisma.subCategory.create({
    data: { name: "Sweets", mainCategoryId: sweetCat.id, shopId: balajiShop.id },
  });
  const styleSub = await prisma.subCategory.create({
    data: { name: "Menswear", mainCategoryId: clothingCat.id, shopId: styleShop.id },
  });
  const foodSub = await prisma.subCategory.create({
    data: { name: "Main Course", mainCategoryId: restaurantCat.id, shopId: foodShop.id },
  });
  const beautySub = await prisma.subCategory.create({
    data: { name: "Skincare", mainCategoryId: cosmeticsCat.id, shopId: beautyShop.id },
  });

  // 6. Create Products
  console.log("Creating products...");
  
  // Cake
  await prisma.product.create({
    data: {
      name: "Chocolate Truffle Cake",
      description: "Baked with premium cocoa powder, dark chocolate ganache, and light fluffy bread.",
      price: 499.00,
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: cakeSub.id,
      shopId: cakeShop.id,
    },
  });

  // Sweets - Gupta Sweets
  const rasgulla = await prisma.product.create({
    data: {
      name: "Rasgulla (1kg)",
      description: "Soft & spongy rasgulla made from fresh chhena. Cooked in sugar syrup to perfection.",
      price: 240.00,
      imageUrl: "https://images.unsplash.com/photo-1589135304675-888fc833e3d8?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: guptaSub.id,
      shopId: guptaShop.id,
    },
  });

  // Sweets - Bengal Sweets
  await prisma.product.create({
    data: {
      name: "Kaju Katli (250gm)",
      description: "Premium kaju katli made with quality cashew nuts and edible silver foil overlay.",
      price: 320.00,
      imageUrl: "https://images.unsplash.com/photo-1605197586541-89361097a58d?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: bengalSub.id,
      shopId: bengalShop.id,
    },
  });

  // Sweets - Mishra Sweets
  await prisma.product.create({
    data: {
      name: "Motichoor Laddu (1kg)",
      description: "Traditional motichoor laddus made in pure desi ghee with dry fruits garnish.",
      price: 280.00,
      imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: mishraSub.id,
      shopId: mishraShop.id,
    },
  });

  // Sweets - Shree Balaji Sweets
  await prisma.product.create({
    data: {
      name: "Gulab Jamun (1kg)",
      description: "Soft & juicy gulab jamuns made with khoya and cardamom flavoured syrup.",
      price: 260.00,
      imageUrl: "https://images.unsplash.com/photo-1548682613-176b6505b6bc?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: balajiSub.id,
      shopId: balajiShop.id,
    },
  });

  // Clothing
  await prisma.product.create({
    data: {
      name: "Men's Casual Shirt",
      description: "Heavy cotton streetwear t-shirt in green fabric with casual collar lines.",
      price: 699.00,
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: styleSub.id,
      shopId: styleShop.id,
    },
  });

  // Restaurant
  await prisma.product.create({
    data: {
      name: "Paneer Butter Masala",
      description: "Delicious rich, creamy paneer cubes simmered in spiced onion tomato butter gravy.",
      price: 220.00,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: foodSub.id,
      shopId: foodShop.id,
    },
  });

  // Cosmetics
  await prisma.product.create({
    data: {
      name: "Lakme Facewash",
      description: "Lakme refreshing strawberry face wash. Rich in antioxidants and strawberry extracts.",
      price: 149.00,
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      subCategoryId: beautySub.id,
      shopId: beautyShop.id,
    },
  });

  // 7. Create Customer
  const customer = await prisma.user.create({
    data: {
      name: "Ankit Kumar",
      email: "user@example.com",
      password,
      role: "USER",
    },
  });

  // 8. Create a Review for Gupta Sweets to display rating "4.6"
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Absolutely delicious rasgullas. Always fresh!",
      userId: customer.id,
      shopId: guptaShop.id,
    },
  });

  console.log("Database seeded successfully!");
  console.log("Customer: user@example.com / P@ssword123");
  console.log("Gupta Sweets Vendor ID: ", guptaShop.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
