import { 
  users, 
  personalEmissions,
  industrialEmissions,
  type User, 
  type InsertUser,
  type PersonalEmissions,
  type IndustrialEmissions,
  type InsertPersonalEmissions,
  type InsertIndustrialEmissions
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPersonalEmission(emission: InsertPersonalEmissions & { totalEmissions: number }): Promise<PersonalEmissions>;
  createIndustrialEmission(emission: InsertIndustrialEmissions & { 
    scope1Emissions: number;
    scope2Emissions: number;
    scope3Emissions: number;
    totalEmissions: number;
  }): Promise<IndustrialEmissions>;
  getPersonalEmissions(userId?: number): Promise<PersonalEmissions[]>;
  getIndustrialEmissions(userId?: number): Promise<IndustrialEmissions[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private personalEmissions: Map<number, PersonalEmissions>;
  private industrialEmissions: Map<number, IndustrialEmissions>;
  private currentUserId: number;
  private currentPersonalId: number;
  private currentIndustrialId: number;

  constructor() {
    this.users = new Map();
    this.personalEmissions = new Map();
    this.industrialEmissions = new Map();
    this.currentUserId = 1;
    this.currentPersonalId = 1;
    this.currentIndustrialId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPersonalEmission(emission: InsertPersonalEmissions & { totalEmissions: number }): Promise<PersonalEmissions> {
    const id = this.currentPersonalId++;
    const personalEmission: PersonalEmissions = {
      ...emission,
      id,
      userId: null,
      createdAt: new Date(),
    };
    this.personalEmissions.set(id, personalEmission);
    return personalEmission;
  }

  async createIndustrialEmission(emission: InsertIndustrialEmissions & { 
    scope1Emissions: number;
    scope2Emissions: number;
    scope3Emissions: number;
    totalEmissions: number;
  }): Promise<IndustrialEmissions> {
    const id = this.currentIndustrialId++;
    const industrialEmission: IndustrialEmissions = {
      ...emission,
      id,
      userId: null,
      createdAt: new Date(),
    };
    this.industrialEmissions.set(id, industrialEmission);
    return industrialEmission;
  }

  async getPersonalEmissions(userId?: number): Promise<PersonalEmissions[]> {
    const emissions = Array.from(this.personalEmissions.values());
    if (userId) {
      return emissions.filter(e => e.userId === userId);
    }
    return emissions;
  }

  async getIndustrialEmissions(userId?: number): Promise<IndustrialEmissions[]> {
    const emissions = Array.from(this.industrialEmissions.values());
    if (userId) {
      return emissions.filter(e => e.userId === userId);
    }
    return emissions;
  }
}

export const storage = new MemStorage();
