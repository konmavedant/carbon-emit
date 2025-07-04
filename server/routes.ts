import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPersonalEmissionsSchema, insertIndustrialEmissionsSchema } from "@shared/schema";
import { calculatePersonalEmissions, calculateIndustrialEmissions } from "./lib/calculations";
import { generateOptimizationSuggestions, generateEmissionForecast } from "./lib/ai-mock";

export async function registerRoutes(app: Express): Promise<Server> {
  // Personal emissions calculation
  app.post("/api/calculate/personal", async (req, res) => {
    try {
      const data = insertPersonalEmissionsSchema.parse(req.body);
      const calculations = calculatePersonalEmissions(data);
      
      const emission = await storage.createPersonalEmission({
        ...data,
        totalEmissions: calculations.totalEmissions,
      });

      const forecast = generateEmissionForecast(calculations.totalEmissions);
      const suggestions = generateOptimizationSuggestions('personal', calculations);

      res.json({
        emission,
        calculations,
        forecast,
        suggestions
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Industrial emissions calculation
  app.post("/api/calculate/industrial", async (req, res) => {
    try {
      const data = insertIndustrialEmissionsSchema.parse(req.body);
      const calculations = calculateIndustrialEmissions(data);
      
      const emission = await storage.createIndustrialEmission({
        ...data,
        scope1Emissions: calculations.scope1,
        scope2Emissions: calculations.scope2,
        scope3Emissions: calculations.scope3,
        totalEmissions: calculations.totalEmissions,
      });

      const forecast = generateEmissionForecast(calculations.totalEmissions);
      const suggestions = generateOptimizationSuggestions('industrial', calculations);

      res.json({
        emission,
        calculations,
        forecast,
        suggestions
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Get emission factors for reference
  app.get("/api/emission-factors", async (req, res) => {
    const factors = await import("./lib/emission-factors");
    res.json(factors.default);
  });

  const httpServer = createServer(app);
  return httpServer;
}
