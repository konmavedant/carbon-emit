import { Link } from "wouter";
import { Home, Building, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UserTypeSelection() {
  const calculatorTypes = [
    {
      type: "personal",
      title: "Personal Calculator",
      description: "Calculate your individual carbon footprint including home energy, transportation, and lifestyle choices.",
      icon: Home,
      color: "emerald",
      features: [
        "Home energy usage",
        "Transportation tracking",
        "Lifestyle analysis",
      ],
    },
    {
      type: "industrial",
      title: "Industrial Calculator",
      description: "Enterprise-grade calculation for businesses with complex supply chains and industrial processes.",
      icon: Building,
      color: "blue",
      features: [
        "Industrial processes",
        "Supply chain tracking",
        "GHG Protocol compliance",
      ],
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Calculator Type
          </h2>
          <p className="text-lg text-gray-600">
            Select the calculation method that best fits your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {calculatorTypes.map((calc, index) => (
            <motion.div
              key={calc.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white shadow-sm border-2 border-transparent hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-${calc.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <calc.icon className={`h-8 w-8 text-${calc.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{calc.title}</h3>
                  <p className="text-gray-600 mb-6">{calc.description}</p>
                  <ul className="text-sm text-gray-500 space-y-2 mb-6">
                    {calc.features.map((feature) => (
                      <li key={feature} className="flex items-center justify-center">
                        <Check className={`h-4 w-4 mr-2 text-${calc.color}-500`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/calculator/${calc.type}`}>
                    <Button 
                      className={`w-full ${calc.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      Start {calc.title}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
