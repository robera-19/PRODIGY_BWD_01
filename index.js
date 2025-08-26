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

// CREATE a new user
app.post("/users", (req, res) => {
  try {
    // Validate user input using Zod
    const validatedUser = userSchema.parse(req.body);

    // Generate a unique ID for the new user
    const id = uuidv4();

    // Save user in in-memory storage
    users[id] = { id, ...validatedUser };

    // Respond with the created user (HTTP 201: Created)
    res.status(201).json(users[id]);
  } catch (err) {
    // Respond with error if validation fails (HTTP 400: Bad Request)
    res.status(400).json({ error: err.errors || err.message });
  }
});


// READ all users
app.get("/users", (req, res) => {
  // Return all users as an array
  res.json(Object.values(users));
});

// READ a single user by ID
app.get("/users/:id", (req, res) => {
  const user = users[req.params.id]; // Find user by ID
  if (!user) return res.status(404).json({ error: "User not found" }); // Not found
  res.json(user); // Return user if found
});


// UPDATE a user by ID
app.put("/users/:id", (req, res) => {
  const user = users[req.params.id]; // Find user by ID
  if (!user) return res.status(404).json({ error: "User not found" }); // Not found

  try {
    // Validate updated user input using Zod
    const validatedUser = userSchema.parse(req.body);

    // Update user in in-memory storage
    users[req.params.id] = { id: req.params.id, ...validatedUser };

    // Respond with the updated user
    res.json(users[req.params.id]);
  } catch (err) {
    // Respond with error if validation fails
    res.status(400).json({ error: err.errors || err.message });
  }
});