/**
 * Script to promote a user to admin role.
 * Usage: npx tsx scripts/make-admin.ts <email>
 * 
 * Example: npx tsx scripts/make-admin.ts admin@example.com
 */

import mongoose from "mongoose";
import User from "../models/User";

async function makeAdmin(email: string) {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI environment variable is not set.");
    console.error("Make sure you have a .env.local file with MONGODB_URI defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.error(`User with email "${email}" not found.`);
      console.error("Make sure the user has already signed up before running this script.");
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log(`User "${email}" is already an admin.`);
    } else {
      user.role = "admin";
      await user.save();
      console.log(`✅ User "${email}" has been promoted to admin successfully!`);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    process.exit(1);
  }
}

const email = process.argv[2];

if (!email) {
  console.error("Usage: npx tsx scripts/make-admin.ts <email>");
  console.error("Example: npx tsx scripts/make-admin.ts admin@example.com");
  process.exit(1);
}

makeAdmin(email);