import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface EmissionInsightsProps {
  data: {
    calculations: any;
    suggestions: any[];
  };
}

export default function EmissionInsights({ data }: EmissionInsightsProps) {
  const { calculations } = data;
  const isIndustrial = calculations.scope1 !== undefined;
  
  // Benchmark data for comparison
  const personalBenchmarks = {
    global_average: 4.8,
    us_average: 16.0,
    eu_average: 8.2,
    target_2030: 2.3,
  };

  const industrialBenchmarks = {
    manufacturing_avg: 250,
    technology_avg: 45,
    retail_avg: 120,
    target_intensity: 0.5, // tonnes CO2e per $1M revenue
  };

  const getComparisonData = () => {
    if (isIndustrial) {
      const revenueIntensity = calculations.totalEmissions / (data.calculations.breakdown ? 50 : 1); // Assuming $50M revenue as example
      return {
        current: calculations.totalEmissions,
        benchmark: industrialBenchmarks.manufacturing_avg,
        intensity: revenueIntensity,
        target: industrialBenchmarks.target_intensity,
      };
    } else {
      return {
        current: calculations.totalEmissions,
        global: personalBenchmarks.global_average,
        country: personalBenchmarks.us_average,
        target: personalBenchmarks.target_2030,
      };
    }
  };

  const comparison = getComparisonData();

  const getPerformanceLevel = () => {
    if (isIndustrial) {
      if (comparison.current < industrialBenchmarks.manufacturing_avg * 0.7) return { level: 'excellent', color: 'text-green-600', icon: CheckCircle };
      if (comparison.current < industrialBenchmarks.manufacturing_avg) return { level: 'good', color: 'text-blue-600', icon: TrendingDown };
      if (comparison.current < industrialBenchmarks.manufacturing_avg * 1.5) return { level: 'average', color: 'text-yellow-600', icon: Info };
      return { level: 'needs_improvement', color: 'text-red-600', icon: AlertTriangle };
    } else {
      if (comparison.current < personalBenchmarks.target_2030) return { level: 'excellent', color: 'text-green-600', icon: CheckCircle };
      if (comparison.current < personalBenchmarks.global_average) return { level: 'good', color: 'text-blue-600', icon: TrendingDown };
      if (comparison.current < personalBenchmarks.us_average) return { level: 'average', color: 'text-yellow-600', icon: Info };
      return { level: 'needs_improvement', color: 'text-red-600', icon: AlertTriangle };
    }
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  const getActionPriorities = () => {
    if (isIndustrial) {
      const { breakdown } = calculations;
      const priorities = [
        { category: 'Scope 2 (Energy)', value: calculations.scope2, suggestion: 'Switch to renewable energy sources' },
        { category: 'Scope 1 (Direct)', value: calculations.scope1, suggestion: 'Improve equipment efficiency' },
        { category: 'Scope 3 (Value Chain)', value: calculations.scope3, suggestion: 'Optimize supply chain' },
      ].sort((a, b) => b.value - a.value);
      
      return priorities.slice(0, 3);
    } else {
      const categories = [
        { category: 'Flights', value: calculations.flights, suggestion: 'Reduce air travel frequency' },
        { category: 'Electricity', value: calculations.electricity, suggestion: 'Switch to renewable energy' },
        { category: 'Diet', value: calculations.diet, suggestion: 'Adopt more plant-based meals' },
        { category: 'Transport', value: calculations.transport, suggestion: 'Use electric or public transport' },
        { category: 'Shopping', value: calculations.shopping, suggestion: 'Buy sustainable products' },
        { category: 'Waste', value: calculations.waste || 0, suggestion: 'Increase recycling and composting' },
      ].sort((a, b) => b.value - a.value);
      
      return categories.slice(0, 3);
    }
  };

  const actionPriorities = getActionPriorities();

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Performance Assessment */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PerformanceIcon className={`h-5 w-5 mr-2 ${performance.color}`} />
            Performance Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Your Total Emissions</span>
              <span className="font-semibold text-lg">{comparison.current.toFixed(1)} tonnes CO₂e</span>
            </div>
            
            {!isIndustrial ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Global Average</span>
                  <span className="text-sm">{comparison.global} tonnes CO₂e</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Country Average</span>
                  <span className="text-sm">{comparison.country} tonnes CO₂e</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">2030 Climate Target</span>
                  <span className="text-sm font-medium text-green-600">{comparison.target} tonnes CO₂e</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Industry Average</span>
                  <span className="text-sm">{comparison.benchmark} tonnes CO₂e</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Carbon Intensity</span>
                  <span className="text-sm">{comparison.intensity?.toFixed(2)} tonnes CO₂e/$M revenue</span>
                </div>
              </>
            )}
            
            <div className="pt-2 border-t">
              <p className={`text-sm font-medium ${performance.color}`}>
                Performance: {performance.level.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Priorities */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Top Priority Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionPriorities.map((priority, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{index + 1}. {priority.category}</span>
                  <span className="text-xs text-gray-500">{priority.value.toFixed(2)} t CO₂e</span>
                </div>
                <p className="text-xs text-gray-600">{priority.suggestion}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500">
              💡 <strong>Tip:</strong> Focus on the highest emission categories first for maximum impact. 
              Even small improvements in top categories can significantly reduce your total footprint.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}