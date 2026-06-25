/**
 * Script to create a default admin user.
 * Usage: npx tsx scripts/seed-admin.ts
 * 
 * This will create an admin user with:
 *   Email: admin@example.com
 *   Password: admin123
 * 
 * You can change these by passing arguments:
 *   npx tsx scripts/seed-admin.ts <email> <password>
 */

import mongoose from "mongoose";
import User from "../models/User";

async function seedAdmin(email?: string, password?: string) {
 const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI environment variable is not set.");
    console.error("Make sure you have a .env.local file with MONGODB_URI defined.");
    process.exit(1);
  }

  const adminEmail = email || "admin@example.com";
  const adminPassword = password || "admin123";

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const existingUser = await User.findOne({ email: adminEmail.toLowerCase().trim() });

    if (existingUser) {
      if (existingUser.role === "admin") {
        console.log(`Admin user "${adminEmail}" already exists.`);
      } else {
        existingUser.role = "admin";
        await existingUser.save();
        console.log(`✅ User "${adminEmail}" has been promoted to admin!`);
      }
    } else {
      await User.create({
        first_name: "Admin",
        last_name: "User",
        email: adminEmail.toLowerCase().trim(),
        password: adminPassword,
        role: "admin",
        phone: "",
        image: "",
      });
      console.log(`✅ Default admin user created successfully!`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
}

const email = process.argv[2];
const password = process.argv[3];
seedAdmin(email, password);