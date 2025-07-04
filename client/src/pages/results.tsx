import { useLocation } from "wouter";
import { useEffect } from "react";
import EmissionCharts from "@/components/results/emission-charts";
import EmissionInsights from "@/components/results/emission-insights";
import OptimizationRecommendations from "@/components/results/optimization-recommendations";
import ActionButtons from "@/components/results/action-buttons";

export default function Results() {
  const [, setLocation] = useLocation();

  // Get results from localStorage (passed from calculator)
  const resultsData = localStorage.getItem('calculationResults');
  
  useEffect(() => {
    if (!resultsData) {
      setLocation('/');
    }
  }, [resultsData, setLocation]);

  if (!resultsData) {
    return null;
  }

  const results = JSON.parse(resultsData);

  return (
    <div className="min-h-screen py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Carbon Footprint Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Detailed insights and recommendations for optimization
          </p>
        </div>

        <EmissionInsights data={results} />
        <EmissionCharts data={results} />
        <OptimizationRecommendations suggestions={results.suggestions} />
        <ActionButtons isIndustrial={results.calculations.scope1 !== undefined} />
      </div>
    </div>
  );
}
