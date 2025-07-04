import { EMISSION_FACTORS } from "./emission-factors";
import { type PersonalEmissionData, type IndustrialEmissionData } from "@/types/emissions";

export function calculatePersonalEmissions(data: PersonalEmissionData) {
  const countryFactor = EMISSION_FACTORS.electricity[data.country] || EMISSION_FACTORS.electricity.default;
  
  // Calculate emissions by category (tonnes CO2e)
  const electricity = (data.electricityKwh * 12 * countryFactor) / 1000;
  const transport = (data.weeklyDrivingKm * 52 * EMISSION_FACTORS.transport.car) / 1000;
  const flights = data.annualFlightHours * EMISSION_FACTORS.transport.flight;
  const diet = EMISSION_FACTORS.diet[data.dietType] || EMISSION_FACTORS.diet.mixed;
  const shopping = (data.monthlyShopping * 12 * 0.5) / 1000; // 0.5 kg CO2e per dollar
  
  return {
    electricity,
    transport,
    flights,
    diet,
    shopping,
    totalEmissions: electricity + transport + flights + diet + shopping,
  };
}

export function calculateIndustrialEmissions(data: IndustrialEmissionData) {
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

  return {
    scope1,
    scope2,
    scope3,
    totalEmissions: scope1 + scope2 + scope3,
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
