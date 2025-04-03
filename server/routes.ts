import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate request body with Zod schema
  const validateRequest = <T extends z.ZodType>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.errors,
          });
        }
        next(error);
      }
    };
  };

  // API routes for contact form submission
  app.post("/api/contact", validateRequest(insertContactSchema), async (req, res) => {
    try {
      const { name, email, service, message } = req.body;
      
      // Store contact submission in database
      const contactSubmission = await storage.createContactSubmission({
        name, 
        email, 
        service, 
        message
      });
      
      // Send success response
      res.status(201).json({ 
        success: true, 
        message: "Your message has been received. We'll get back to you soon.",
        data: contactSubmission
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your message. Please try again later." 
      });
    }
  });

  // Get all contact submissions (admin route)
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContactSubmissions();
      res.status(200).json({ 
        success: true, 
        data: contacts 
      });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching contact submissions." 
      });
    }
  });

  // Add newsletter subscription endpoint
  app.post("/api/subscribe", validateRequest(insertNewsletterSchema), async (req, res) => {
    try {
      const { email } = req.body;
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterByEmail(email);
      if (existingSubscription) {
        return res.status(200).json({ 
          success: true, 
          message: "You are already subscribed to our newsletter." 
        });
      }
      
      // Store newsletter subscription in database
      const subscription = await storage.createNewsletterSubscription({ email });
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!",
        data: subscription
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while subscribing. Please try again later." 
      });
    }
  });

  // Get all newsletter subscriptions (admin route)
  app.get("/api/admin/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getAllNewsletterSubscriptions();
      res.status(200).json({ 
        success: true, 
        data: subscribers 
      });
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching subscribers." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
