import { pgTable, text, serial, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const personalEmissions = pgTable("personal_emissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  country: text("country").notNull(),
  electricityKwh: real("electricity_kwh").notNull(),
  weeklyDrivingKm: real("weekly_driving_km").notNull(),
  annualFlightHours: real("annual_flight_hours").notNull(),
  publicTransportUsage: text("public_transport_usage").notNull(),
  dietType: text("diet_type").notNull(),
  monthlyShopping: real("monthly_shopping").notNull(),
  totalEmissions: real("total_emissions").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const industrialEmissions = pgTable("industrial_emissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  industryType: text("industry_type").notNull(),
  companySize: text("company_size").notNull(),
  annualRevenue: real("annual_revenue").notNull(),
  naturalGas: real("natural_gas").notNull(),
  dieselFuel: real("diesel_fuel").notNull(),
  gridElectricity: real("grid_electricity").notNull(),
  renewableEnergy: real("renewable_energy").notNull(),
  businessTravel: real("business_travel").notNull(),
  wasteGenerated: real("waste_generated").notNull(),
  waterUsage: real("water_usage").notNull(),
  scope1Emissions: real("scope1_emissions").notNull(),
  scope2Emissions: real("scope2_emissions").notNull(),
  scope3Emissions: real("scope3_emissions").notNull(),
  totalEmissions: real("total_emissions").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPersonalEmissionsSchema = createInsertSchema(personalEmissions).omit({
  id: true,
  userId: true,
  totalEmissions: true,
  createdAt: true,
});

export const insertIndustrialEmissionsSchema = createInsertSchema(industrialEmissions).omit({
  id: true,
  userId: true,
  scope1Emissions: true,
  scope2Emissions: true,
  scope3Emissions: true,
  totalEmissions: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PersonalEmissions = typeof personalEmissions.$inferSelect;
export type IndustrialEmissions = typeof industrialEmissions.$inferSelect;
export type InsertPersonalEmissions = z.infer<typeof insertPersonalEmissionsSchema>;
export type InsertIndustrialEmissions = z.infer<typeof insertIndustrialEmissionsSchema>;
