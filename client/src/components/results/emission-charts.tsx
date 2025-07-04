import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface EmissionChartsProps {
  data: {
    calculations: any;
    forecast: {
      months: string[];
      values: number[];
    };
  };
}

export default function EmissionCharts({ data }: EmissionChartsProps) {
  const { calculations, forecast } = data;
  
  // Prepare data for pie chart
  const pieData = calculations.scope1 !== undefined ? [
    { name: 'Scope 1', value: calculations.scope1, color: '#22c55e' },
    { name: 'Scope 2', value: calculations.scope2, color: '#3b82f6' },
    { name: 'Scope 3', value: calculations.scope3, color: '#f59e0b' },
  ] : [
    { name: 'Electricity', value: calculations.electricity, color: '#22c55e' },
    { name: 'Transport', value: calculations.transport, color: '#3b82f6' },
    { name: 'Flights', value: calculations.flights, color: '#f59e0b' },
    { name: 'Diet', value: calculations.diet, color: '#ef4444' },
    { name: 'Shopping', value: calculations.shopping, color: '#8b5cf6' },
  ];

  // Prepare data for line chart
  const lineData = forecast.months.map((month, index) => ({
    month,
    emissions: forecast.values[index],
  }));

  // Summary cards data
  const summaryCards = [
    {
      title: "Total Emissions",
      value: calculations.totalEmissions.toFixed(1),
      unit: "tonnes CO₂e/year",
      color: "text-emerald-500",
    },
    {
      title: "Scope 1 & 2",
      value: calculations.scope1 !== undefined ? 
        (calculations.scope1 + calculations.scope2).toFixed(1) : 
        (calculations.electricity + calculations.transport).toFixed(1),
      unit: "tonnes CO₂e",
      color: "text-blue-500",
    },
    {
      title: "Scope 3",
      value: calculations.scope3 !== undefined ? 
        calculations.scope3.toFixed(1) : 
        (calculations.flights + calculations.diet + calculations.shopping).toFixed(1),
      unit: "tonnes CO₂e",
      color: "text-amber-500",
    },
    {
      title: "Trend",
      value: "↓ 15%",
      unit: "vs projected",
      color: "text-green-500",
    },
  ];

  return (
    <>
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {summaryCards.map((card, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className={`text-3xl font-bold ${card.color} mb-2`}>
                {card.value}
              </div>
              <div className="text-sm text-gray-600">{card.unit}</div>
              <div className="text-xs text-gray-500 mt-1">{card.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Emissions Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>12-Month Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
