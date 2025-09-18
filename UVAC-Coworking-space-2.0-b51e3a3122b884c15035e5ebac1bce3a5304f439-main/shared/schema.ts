import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company"),
  role: text("role"),
  profile_image: text("profile_image"), // URL to the profile image
  created_at: timestamp("created_at").notNull().defaultNow()
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  subscribe: boolean("subscribe").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

// Define schemas manually to avoid complex type inference issues
export const insertUserSchema = z.object({
  username: z.string(),
  password_hash: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
  profile_image: z.string().optional(),
});

export const insertInquirySchema = z.object({
  user_id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string(),
  subscribe: z.boolean().default(false),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export interface User {
  id: number;
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string | null;
  role: string | null;
  profile_image: string | null;
  created_at: Date;
};

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export interface Inquiry {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  subscribe: boolean | null;
  created_at: Date;
};
