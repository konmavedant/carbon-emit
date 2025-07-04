export interface EmissionCalculation {
  totalEmissions: number;
  breakdown: Record<string, number>;
  forecast: {
    months: string[];
    values: number[];
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  suggestions: OptimizationSuggestion[];
}

export interface OptimizationSuggestion {
  category: string;
  title: string;
  description: string;
  potentialReduction: number;
  icon: string;
  color: string;
}

export interface PersonalEmissionData {
  country: string;
  electricityKwh: number;
  weeklyDrivingKm: number;
  annualFlightHours: number;
  publicTransportUsage: string;
  dietType: string;
  monthlyShopping: number;
}

export interface IndustrialEmissionData {
  industryType: string;
  companySize: string;
  annualRevenue: number;
  naturalGas: number;
  dieselFuel: number;
  gridElectricity: number;
  renewableEnergy: number;
  businessTravel: number;
  wasteGenerated: number;
  waterUsage: number;
}
