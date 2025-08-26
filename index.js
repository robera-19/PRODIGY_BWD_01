// Import required modules
const express = require("express");        // Express framework for building APIs
const { v4: uuidv4 } = require("uuid");    // UUID library to generate unique user IDs
const { z } = require("zod");              // Zod library for schema validation

const app = express();
app.use(express.json());
// This line tells Express to automatically read JSON data
// from the request body (what the client sends) 
// and make it available in req.body

const users = {};  // In-memory storage (hashmap) to store users

// Zod schema for user validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().int().positive("Age must be positive"),
});