const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./db.js');

dotenv.config();

const app = express();


// connect DB
connectDB();

// middlewares
app.use(cors()); 
app.use(express.json());

// routes
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Agency backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
