import { type InsertPersonalEmissions, type InsertIndustrialEmissions } from "@shared/schema";
import { EMISSION_FACTORS } from "./emission-factors";

export interface PersonalEmissionCalculations {
  electricity: number;
  transport: number;
  flights: number;
  diet: number;
  shopping: number;
  waste: number;
  totalEmissions: number;
}

export interface IndustrialEmissionCalculations {
  scope1: number;
  scope2: number;
  scope3: number;
  totalEmissions: number;
  breakdown: {
    naturalGas: number;
    diesel: number;
    electricity: number;
    travel: number;
    waste: number;
    water: number;
  };
}

export function calculatePersonalEmissions(data: InsertPersonalEmissions): PersonalEmissionCalculations {
  const countryFactor = (EMISSION_FACTORS.electricity as any)[data.country] || EMISSION_FACTORS.electricity.default;
  
  // Calculate emissions by category (tonnes CO2e)
  const electricity = (data.electricityKwh * 12 * countryFactor) / 1000;
  const transport = (data.weeklyDrivingKm * 52 * EMISSION_FACTORS.transport.car) / 1000;
  const flights = data.annualFlightHours * EMISSION_FACTORS.transport.flight;
  const diet = (EMISSION_FACTORS.diet as any)[data.dietType] || EMISSION_FACTORS.diet.mixed;
  const shopping = (data.monthlyShopping * 12 * EMISSION_FACTORS.lifestyle.shopping) / 1000;
  const waste = (data.weeklyWasteKg * 52 * EMISSION_FACTORS.lifestyle.waste) / 1000;
  
  const totalEmissions = electricity + transport + flights + diet + shopping + waste;

  return {
    electricity,
    transport,
    flights,
    diet,
    shopping,
    waste,
    totalEmissions,
  };
}

export function calculateIndustrialEmissions(data: InsertIndustrialEmissions): IndustrialEmissionCalculations {
  // Scope 1: Direct emissions (tonnes CO2e)
  const naturalGas = (data.naturalGas * EMISSION_FACTORS.industrial.naturalGas) / 1000;
  const diesel = (data.dieselFuel * EMISSION_FACTORS.industrial.diesel) / 1000;
  const scope1 = naturalGas + diesel;

  // Scope 2: Electricity emissions (tonnes CO2e)
  const renewablePercent = data.renewableEnergy / 100;
  const gridElectricity = data.gridElectricity * (1 - renewablePercent);
  const electricity = (gridElectricity * EMISSION_FACTORS.electricity.default) / 1000;
  const scope2 = electricity;

  // Scope 3: Value chain emissions (tonnes CO2e)
  const travel = (data.businessTravel * EMISSION_FACTORS.transport.businessTravel) / 1000;
  const waste = data.wasteGenerated * EMISSION_FACTORS.industrial.waste;
  const water = (data.waterUsage * EMISSION_FACTORS.industrial.water) / 1000;
  const scope3 = travel + waste + water;

  const totalEmissions = scope1 + scope2 + scope3;

  return {
    scope1,
    scope2,
    scope3,
    totalEmissions,
    breakdown: {
      naturalGas,
      diesel,
      electricity,
      travel,
      waste,
      water,
    },
  };
}
