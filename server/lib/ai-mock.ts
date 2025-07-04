import { type PersonalEmissionCalculations, type IndustrialEmissionCalculations } from "./calculations";

export interface OptimizationSuggestion {
  category: string;
  title: string;
  description: string;
  potentialReduction: number;
  icon: string;
  color: string;
}

export interface EmissionForecast {
  months: string[];
  values: number[];
  trend: 'increasing' | 'decreasing' | 'stable';
}

export function generateOptimizationSuggestions(
  type: 'personal' | 'industrial',
  calculations: PersonalEmissionCalculations | IndustrialEmissionCalculations
): OptimizationSuggestion[] {
  if (type === 'personal') {
    const calc = calculations as PersonalEmissionCalculations;
    const suggestions: OptimizationSuggestion[] = [
      {
        category: 'Energy',
        title: 'Switch to Renewable Energy',
        description: 'Install solar panels or switch to a green energy provider to reduce electricity emissions',
        potentialReduction: calc.electricity * 0.8,
        icon: 'sun',
        color: 'emerald',
      },
      {
        category: 'Transport',
        title: 'Electric Vehicle',
        description: 'Consider switching to an electric or hybrid vehicle to reduce transport emissions',
        potentialReduction: calc.transport * 0.7,
        icon: 'zap',
        color: 'blue',
      },
      {
        category: 'Travel',
        title: 'Reduce Air Travel',
        description: 'Use video conferencing or choose ground transport for shorter trips',
        potentialReduction: calc.flights * 0.5,
        icon: 'video',
        color: 'amber',
      },
    ];

    // Add waste reduction suggestion if waste is significant
    if (calc.waste && calc.waste > 0.1) {
      suggestions.push({
        category: 'Waste',
        title: 'Waste Reduction & Recycling',
        description: 'Implement composting, increase recycling, and reduce single-use items',
        potentialReduction: calc.waste * 0.6,
        icon: 'recycle',
        color: 'emerald',
      });
    }

    return suggestions;
  } else {
    const calc = calculations as IndustrialEmissionCalculations;
    return [
      {
        category: 'Energy Efficiency',
        title: 'Upgrade Equipment',
        description: 'Replace old machinery with energy-efficient alternatives',
        potentialReduction: calc.scope2 * 0.3,
        icon: 'cog',
        color: 'emerald',
      },
      {
        category: 'Renewable Energy',
        title: 'Solar Installation',
        description: 'Install on-site renewable energy generation',
        potentialReduction: calc.scope2 * 0.6,
        icon: 'sun',
        color: 'blue',
      },
      {
        category: 'Process Optimization',
        title: 'Waste Reduction',
        description: 'Implement circular economy principles and waste reduction',
        potentialReduction: calc.scope3 * 0.4,
        icon: 'recycle',
        color: 'amber',
      },
    ];
  }
}

export function generateEmissionForecast(currentEmissions: number): EmissionForecast {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Mock forecast with declining trend (optimistic scenario)
  const values = months.map((_, index) => {
    const reduction = index * 0.02; // 2% reduction per month
    return currentEmissions * (1 - reduction);
  });
  
  return {
    months,
    values,
    trend: 'decreasing',
  };
}
