import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

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
    { name: 'Waste', value: calculations.waste || 0, color: '#06b6d4' },
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
        (calculations.flights + calculations.diet + calculations.shopping + (calculations.waste || 0)).toFixed(1),
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

      {/* Detailed Category Breakdown */}
      <Card className="bg-white shadow-sm mb-8">
        <CardHeader>
          <CardTitle>Detailed Category Analysis</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Compare emission sources to identify priority areas for reduction. Higher values indicate greater environmental impact and optimization potential.
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={pieData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Tonnes CO₂e', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(3)} tonnes CO₂e`, 'Annual Emissions']}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">
                  <strong>{item.name}:</strong> {item.value.toFixed(3)} t CO₂e
                  <span className="text-gray-500 ml-1">
                    ({((item.value / calculations.totalEmissions) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Emissions Breakdown</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              {calculations.scope1 !== undefined ? 
                "This chart shows your emissions across the three GHG Protocol scopes. Scope 1 includes direct emissions from owned sources, Scope 2 covers purchased energy, and Scope 3 encompasses value chain activities." :
                "This breakdown shows your personal carbon footprint by category. Each segment represents different aspects of your lifestyle that contribute to carbon emissions."
              }
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent, value }) => `${name}: ${value.toFixed(2)}t (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(3)} tonnes CO₂e`,
                    `${name} Emissions`
                  ]}
                  labelFormatter={() => 'Emission Category'}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-xs text-gray-500">
              <p>💡 <strong>Understanding the chart:</strong> Larger segments indicate higher emission sources. Focus optimization efforts on the largest contributors for maximum impact.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>12-Month Emissions Forecast</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              This forecast predicts your future emissions based on current patterns and optimization opportunities. The declining trend assumes implementation of recommended efficiency measures.
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Tonnes CO₂e', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)} tonnes CO₂e`, 'Projected Emissions']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-xs text-gray-500">
              <p>📈 <strong>Forecast methodology:</strong> Based on current emission patterns and potential reduction measures. Actual results may vary depending on implementation of recommended actions.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
