import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Leaf, Wind, Route, Cog, Sun, Recycle } from "lucide-react";

interface AiRecommendationsProps {
  suggestions: Array<{
    category: string;
    title: string;
    description: string;
    potentialReduction: number;
    icon: string;
    color: string;
  }>;
}

export default function AiRecommendations({ suggestions }: AiRecommendationsProps) {
  const getIcon = (iconName: string) => {
    const icons = {
      sun: Sun,
      zap: Wind,
      video: Route,
      cog: Cog,
      recycle: Recycle,
      leaf: Leaf,
    };
    return icons[iconName as keyof typeof icons] || Leaf;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-50 text-emerald-600",
      blue: "bg-blue-50 text-blue-600", 
      amber: "bg-amber-50 text-amber-600",
    };
    return colors[color as keyof typeof colors] || "bg-gray-50 text-gray-600";
  };

  return (
    <Card className="bg-white shadow-sm mb-12">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Brain className="h-6 w-6 mr-3 text-emerald-500" />
          AI-Powered Optimization Recommendations
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          These personalized recommendations are generated based on your emission profile. 
          Implementation priority is ranked by potential impact and feasibility.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {suggestions.map((suggestion, index) => {
            const Icon = getIcon(suggestion.icon);
            const colorClasses = getColorClasses(suggestion.color);
            
            return (
              <div key={index} className={`p-4 rounded-lg ${colorClasses.replace('text-', 'bg-').replace('-600', '-50')}`}>
                <div className="flex items-center mb-3">
                  <Icon className={`h-5 w-5 mr-2 ${colorClasses.split(' ')[1]}`} />
                  <span className="font-semibold">{suggestion.title}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                <div className={`text-xs font-medium ${colorClasses.split(' ')[1]}`}>
                  Potential: -{suggestion.potentialReduction.toFixed(1)} tonnes CO₂e
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
