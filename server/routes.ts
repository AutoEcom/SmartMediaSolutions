import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, service, message } = req.body;
      
      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "Name, email, and message are required" 
        });
      }
      
      // In a real application, this would store the contact form data
      // or send an email to the appropriate address
      
      // Send success response
      res.status(200).json({ 
        success: true, 
        message: "Your message has been received. We'll get back to you soon." 
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your message. Please try again later." 
      });
    }
  });

  // Add newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate input
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: "Email is required" 
        });
      }
      
      // In a real application, this would store the email to a newsletter list
      
      res.status(200).json({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!" 
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while subscribing. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
