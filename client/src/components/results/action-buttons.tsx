import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ActionButtonsProps {
  isIndustrial?: boolean;
}

export default function ActionButtons({ isIndustrial = false }: ActionButtonsProps) {
  if (isIndustrial) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-none">
          <CardContent className="p-8">
            <CardTitle className="text-xl mb-4">Carbon Dashboard</CardTitle>
            <p className="text-emerald-100 mb-6">
              Track your emissions over time and monitor progress towards your sustainability goals.
            </p>
            <Button 
              asChild
              className="bg-white text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <a 
                href="https://karbon-compass.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Open Dashboard
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none">
          <CardContent className="p-8">
            <CardTitle className="text-xl mb-4">Carbon Offset Registry</CardTitle>
            <p className="text-blue-100 mb-6">
              Purchase verified carbon credits to offset your emissions and support global climate projects.
            </p>
            <Button 
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <a 
                href="https://carbonica-ledger.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                View Registry
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-none">
        <CardContent className="p-8">
          <CardTitle className="text-xl mb-4">Take Action</CardTitle>
          <p className="text-emerald-100 mb-6">
            Start implementing the recommended changes to reduce your carbon footprint and monitor your progress.
          </p>
          <div className="space-y-2 text-sm text-emerald-100">
            <p>• Set monthly reduction targets</p>
            <p>• Track your progress regularly</p>
            <p>• Review and adjust your habits</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none">
        <CardContent className="p-8">
          <CardTitle className="text-xl mb-4">Share Your Results</CardTitle>
          <p className="text-blue-100 mb-6">
            Share your carbon footprint analysis with friends, family, or colleagues to encourage sustainable practices.
          </p>
          <div className="space-y-2 text-sm text-blue-100">
            <p>• Download your report</p>
            <p>• Share with your organization</p>
            <p>• Inspire others to calculate their footprint</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
