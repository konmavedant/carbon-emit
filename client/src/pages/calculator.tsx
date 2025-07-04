import { useParams } from "wouter";
import PersonalForm from "@/components/calculator/personal-form";
import IndustrialForm from "@/components/calculator/industrial-form";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Calculator() {
  const params = useParams();
  const type = params.type as 'personal' | 'industrial';

  if (type !== 'personal' && type !== 'industrial') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Invalid Calculator Type</h1>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Please select either personal or industrial calculator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {type === 'personal' ? <PersonalForm /> : <IndustrialForm />}
    </div>
  );
}
