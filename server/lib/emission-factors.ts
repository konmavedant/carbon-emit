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
    "France": 0.083,
    "Japan": 0.462,
    "Brazil": 0.074,
    "South Korea": 0.424,
    "Italy": 0.233,
    "Spain": 0.181,
    "Netherlands": 0.311,
    "Poland": 0.718,
    "South Africa": 0.928,
    "Mexico": 0.458,
    "Turkey": 0.393,
    "Argentina": 0.366,
    "Norway": 0.013,
    "Sweden": 0.045,
    "Switzerland": 0.029,
    "Finland": 0.131,
    "Denmark": 0.109,
    "Belgium": 0.174,
    "Austria": 0.159,
    "Portugal": 0.252,
    "Greece": 0.569,
    "Ireland": 0.295,
    "New Zealand": 0.161,
    "Thailand": 0.501,
    "Malaysia": 0.708,
    "Indonesia": 0.709,
    "Philippines": 0.631,
    "Vietnam": 0.514,
    "Singapore": 0.408,
    "Israel": 0.598,
    "United Arab Emirates": 0.490,
    "Saudi Arabia": 0.694,
    "Egypt": 0.532,
    "Chile": 0.298,
    "Colombia": 0.164,
    "Peru": 0.233,
    "Russia": 0.322,
    "Ukraine": 0.358,
    "Czech Republic": 0.449,
    "Hungary": 0.256,
    "Romania": 0.292,
    "Bulgaria": 0.433,
    "Croatia": 0.181,
    "Slovakia": 0.123,
    "Slovenia": 0.263,
    "Lithuania": 0.089,
    "Latvia": 0.109,
    "Estonia": 0.291,
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
    waste: 0.57, // kg CO2e/kg waste (including landfill methane emissions)
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
