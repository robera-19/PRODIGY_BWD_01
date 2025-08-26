// Import required modules
const express = require("express");        // Express framework for building APIs
const { v4: uuidv4 } = require("uuid");    // UUID library to generate unique user IDs

const app = express();
app.use(express.json());
// This line tells Express to automatically read JSON data
// from the request body (what the client sends) 
// and make it available in req.body