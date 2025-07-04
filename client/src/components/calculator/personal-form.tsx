import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { MapPin, Car, Utensils, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  country: z.string().min(1, "Country is required"),
  electricityKwh: z.coerce.number().min(0, "Must be a positive number"),
  weeklyDrivingKm: z.coerce.number().min(0, "Must be a positive number"),
  annualFlightHours: z.coerce.number().min(0, "Must be a positive number"),
  publicTransportUsage: z.string().min(1, "Public transport usage is required"),
  dietType: z.string().min(1, "Diet type is required"),
  monthlyShopping: z.coerce.number().min(0, "Must be a positive number"),
});

export default function PersonalForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      electricityKwh: 0,
      weeklyDrivingKm: 0,
      annualFlightHours: 0,
      publicTransportUsage: "",
      dietType: "",
      monthlyShopping: 0,
    },
  });

  const calculateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/calculate/personal", data);
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

  const countries = [
    "United States",
    "United Kingdom", 
    "Germany",
    "Canada",
    "Australia",
    "Other"
  ];

  const transportOptions = [
    { value: "rarely", label: "Rarely" },
    { value: "occasionally", label: "Occasionally" },
    { value: "frequently", label: "Frequently" },
  ];

  const dietOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "mixed", label: "Mixed Diet" },
    { value: "meat-heavy", label: "Meat Heavy" },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Personal Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Provide your lifestyle details for accurate emission calculation
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Location & Energy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-emerald-500" />
                  Location & Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country/Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
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
                  name="electricityKwh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Electricity (kWh)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 800" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-blue-500" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="weeklyDrivingKm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weekly Driving (km)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annualFlightHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Flights (hours)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publicTransportUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public Transport (weekly)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select usage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {transportOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Lifestyle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-amber-500" />
                  Lifestyle & Consumption
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dietType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diet Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select diet type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dietOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="monthlyShopping"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Shopping ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500" {...field} />
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
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={calculateMutation.isPending}
              >
                {calculateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate My Carbon Footprint"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
