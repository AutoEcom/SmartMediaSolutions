import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContact,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletter
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from "drizzle-orm";

// Define the storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Newsletter methods
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<NewsletterSubscription>;
  getNewsletterByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

// In-memory storage implementation (for testing without database)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactSubmission>;
  private newsletters: Map<number, NewsletterSubscription>;
  private userId: number;
  private contactId: number;
  private newsletterId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.userId = 1;
    this.contactId = 1;
    this.newsletterId = 1;
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
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const id = this.contactId++;
    const timestamp = new Date();
    
    // Make sure service is always a string
    const serviceValue = contact.service || "";
    
    const contactSubmission: ContactSubmission = { 
      name: contact.name,
      email: contact.email,
      message: contact.message,
      service: serviceValue,
      id, 
      createdAt: timestamp 
    };
    
    this.contacts.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values());
  }
  
  async createNewsletterSubscription(newsletter: InsertNewsletter): Promise<NewsletterSubscription> {
    const id = this.newsletterId++;
    const timestamp = new Date();
    const subscription: NewsletterSubscription = { 
      ...newsletter, 
      id, 
      createdAt: timestamp 
    };
    this.newsletters.set(id, subscription);
    return subscription;
  }
  
  async getNewsletterByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }
  
  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletters.values());
  }
}

// Database storage implementation
export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    try {
      // Get connection string from environment variable
      const connectionString = process.env.DATABASE_URL || "";
      
      // Create postgres-js client
      const client = postgres(connectionString, { 
        max: 10, // Connection pool size
        ssl: { rejectUnauthorized: false } // Accept self-signed certs
      });
      
      // Initialize drizzle with postgres client
      this.db = drizzle(client);
      
      console.log("Database connection initialized successfully");
    } catch (error) {
      console.error("Error initializing database connection:", error);
      // Fallback to memory storage if connection fails
      throw new Error("Failed to initialize database connection");
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const results = await this.db.select().from(users).where(eq(users.id, id));
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await this.db.select().from(users).where(eq(users.username, username));
    return results[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const results = await this.db.insert(users).values(user).returning();
    return results[0];
  }
  
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const results = await this.db.insert(contactSubmissions).values(contact).returning();
    return results[0];
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db.select().from(contactSubmissions);
  }
  
  async createNewsletterSubscription(newsletter: InsertNewsletter): Promise<NewsletterSubscription> {
    const results = await this.db.insert(newsletterSubscriptions).values(newsletter).returning();
    return results[0];
  }
  
  async getNewsletterByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const results = await this.db.select().from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return results[0];
  }
  
  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await this.db.select().from(newsletterSubscriptions);
  }
}

// Use memory storage for simplicity and reliability
export const storage = new MemStorage();
