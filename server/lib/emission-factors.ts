// GHG Protocol compliant emission factors
export const EMISSION_FACTORS = {
  // Electricity grid emission factors (kg CO2e/kWh)
  electricity: {
    "United States": 0.386,
    "United Kingdom": 0.233,
    "Germany": 0.401,
    "Canada": 0.130,
    "Australia": 0.634,
    "India": 0.820,
    "China": 0.555,
    default: 0.500,
  },
  
  // Transport emission factors (kg CO2e/km or kg CO2e/hour)
  transport: {
    car: 0.171, // kg CO2e/km
    flight: 0.255, // kg CO2e/passenger-km (converted to per hour)
    businessTravel: 0.200, // kg CO2e/km
  },
  
  // Diet emission factors (tonnes CO2e/year)
  diet: {
    vegetarian: 1.5,
    pescatarian: 1.9,
    mixed: 2.5,
    "meat-heavy": 3.3,
  },
  
  // Lifestyle emission factors
  lifestyle: {
    shopping: 0.5, // kg CO2e/dollar spent
  },
  
  // Industrial emission factors
  industrial: {
    naturalGas: 1.91, // kg CO2e/m3
    diesel: 2.69, // kg CO2e/liter
    waste: 0.5, // tonnes CO2e/tonne waste
    water: 0.0003, // kg CO2e/liter
  },
} as const;

export default EMISSION_FACTORS;
