import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("P@ssword123", 10);

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@districtkart.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@districtkart.com",
      password,
      role: "ADMIN",
    },
  });

  // 2. Create Vendor
  const vendor = await prisma.user.upsert({
    where: { email: "vendor@districtkart.com" },
    update: {},
    create: {
      name: "Kashish Handlooms",
      email: "vendor@districtkart.com",
      password,
      role: "VENDOR",
      phone: "+91 91234 56789",
    },
  });

  // 3. Create Shop for Vendor
  const shop = await prisma.shop.upsert({
    where: { vendorId: vendor.id },
    update: {},
    create: {
      name: "Kashish Handlooms",
      description: "Exclusive collection of Samastipur handlooms and traditional wear.",
      status: "APPROVED",
      isActive: true,
      vendorId: vendor.id,
    },
  });

  // 4. Create MainCategory (global — admin-owned)
  const fashionMain = await prisma.mainCategory.upsert({
    where: { name: "Fashion" },
    update: {},
    create: {
      name: "Fashion",
      icon: "👗",
      description: "Clothing, accessories and traditional wear",
    },
  });

  // 5. Create SubCategory for this shop under the MainCategory
  const ethnicSub = await prisma.subCategory.upsert({
    where: { name_shopId: { name: "Ethnic Wear", shopId: shop.id } },
    update: {},
    create: {
      name: "Ethnic Wear",
      description: "Sarees, Suits and more",
      mainCategoryId: fashionMain.id,
      shopId: shop.id,
    },
  });

  // 6. Create Products using the SubCategory
  await prisma.product.createMany({
    data: [
      {
        name: "DK Hype Hoodie",
        description: "A dark brutalist heavy-knit hoodie with high contrast cream and red graphics. Limited edition drop.",
        price: 12000,
        imageUrl: "/images/hype_hoodie.png",
        subCategoryId: ethnicSub.id,
        shopId: shop.id,
      },
      {
        name: "DK Street Tee",
        description: "Raw-edge heavyweight cotton streetwear t-shirt in cream with signature red tag branding.",
        price: 4500,
        imageUrl: "/images/street_tee.png",
        subCategoryId: ethnicSub.id,
        shopId: shop.id,
      },
      {
        name: "DK Crown Cap",
        description: "Premium baseball cap in washed black with an embroidered crown logo and contrast piping.",
        price: 2500,
        imageUrl: "/images/crown_cap.png",
        subCategoryId: ethnicSub.id,
        shopId: shop.id,
      },
    ],
  });

  // 7. Create normal User
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Customer User",
      email: "user@example.com",
      password,
      role: "USER",
    },
  });

  console.log("Seed data created successfully!");
  console.log("Admin:  admin@districtkart.com  / P@ssword123");
  console.log("Vendor: vendor@districtkart.com / P@ssword123");
  console.log("User:   user@example.com        / P@ssword123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
