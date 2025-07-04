import { Factory, Zap, Truck, CheckCircle, Recycle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Education() {
  const scopes = [
    {
      title: "Scope 1 Emissions",
      description: "Direct emissions from owned or controlled sources like fuel combustion and industrial processes.",
      icon: Factory,
      color: "emerald",
    },
    {
      title: "Scope 2 Emissions",
      description: "Indirect emissions from purchased electricity, steam, heating, and cooling.",
      icon: Zap,
      color: "blue",
    },
    {
      title: "Scope 3 Emissions",
      description: "Indirect emissions from value chain activities like transportation and waste.",
      icon: Truck,
      color: "amber",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Carbon Emissions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn the fundamentals of carbon accounting and GHG protocols to make informed decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {scopes.map((scope, index) => (
            <motion.div
              key={scope.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-50 border-none">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 bg-${scope.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <scope.icon className={`h-6 w-6 text-${scope.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{scope.title}</h3>
                  <p className="text-gray-600">{scope.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Carbon Credits & Offsets</h3>
              <p className="text-emerald-100 mb-6">
                Carbon credits represent verified emission reductions. They enable organizations to offset their carbon footprint through verified projects like reforestation and renewable energy.
              </p>
              <div className="flex items-center text-emerald-100">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Verified by international standards</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 bg-white/10 rounded-xl mx-auto flex items-center justify-center">
                <Recycle className="h-24 w-24 text-white/70" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
