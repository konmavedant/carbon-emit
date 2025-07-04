import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Building, Factory, Zap, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  industryType: z.string().min(1, "Industry type is required"),
  companySize: z.string().min(1, "Company size is required"),
  annualRevenue: z.coerce.number().min(0, "Must be a positive number"),
  naturalGas: z.coerce.number().min(0, "Must be a positive number"),
  dieselFuel: z.coerce.number().min(0, "Must be a positive number"),
  gridElectricity: z.coerce.number().min(0, "Must be a positive number"),
  renewableEnergy: z.coerce.number().min(0, "Must be a positive number"),
  businessTravel: z.coerce.number().min(0, "Must be a positive number"),
  wasteGenerated: z.coerce.number().min(0, "Must be a positive number"),
  waterUsage: z.coerce.number().min(0, "Must be a positive number"),
});

export default function IndustrialForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryType: "",
      companySize: "",
      annualRevenue: 0,
      naturalGas: 0,
      dieselFuel: 0,
      gridElectricity: 0,
      renewableEnergy: 0,
      businessTravel: 0,
      wasteGenerated: 0,
      waterUsage: 0,
    },
  });

  const calculateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/calculate/industrial", data);
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('calculationResults', JSON.stringify(data));
      setLocation('/results');
    },
    onError: (error) => {
      toast({
        title: "Calculation Error",
        description: "Failed to calculate emissions. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    calculateMutation.mutate(data);
  };

  const industryTypes = [
    "Manufacturing",
    "Technology",
    "Retail",
    "Healthcare",
    "Finance",
    "Other"
  ];

  const companySizes = [
    "Small (1-50 employees)",
    "Medium (51-250 employees)",
    "Large (251+ employees)"
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Industrial Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Enter your industrial data for comprehensive GHG Protocol analysis
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-500" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="industryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annualRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue ($M)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Scope 1 Emissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="h-5 w-5 mr-2 text-emerald-500" />
                  Scope 1: Direct Emissions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="naturalGas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Natural Gas (m³/year)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dieselFuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diesel Fuel (L/year)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Scope 2 Emissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-500" />
                  Scope 2: Energy Consumption
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gridElectricity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grid Electricity (kWh/year)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="renewableEnergy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Renewable Energy (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Scope 3 Emissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-amber-500" />
                  Scope 3: Value Chain
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="businessTravel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Travel (km/year)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 100000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wasteGenerated"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waste Generated (tonnes/year)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="waterUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water Usage (m³/year)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600"
                disabled={calculateMutation.isPending}
              >
                {calculateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Industrial Emissions"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
