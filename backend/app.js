const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Base = require("./models/Base");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Military Asset Management API is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const authRoutes = require("./routes/auth");
const assetRoutes = require("./routes/assetRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const transferRoutes = require("./routes/transferRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(process.env.PORT || 5000, async () => {
  await ensureBasesExist();
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

async function ensureBasesExist() {
  const baseList = [
    { name: "Base Alpha", location: "Kolkata" },
    { name: "Base Bravo", location: "Delhi" },
    { name: "Base Charlie", location: "Mumbai" },
    { name: "Base Delta", location: "Bangalore" },
    { name: "Base Echo", location: "Hyderabad" },
  ];

  for (const baseData of baseList) {
    const exists = await Base.findOne(baseData);
    if (!exists) {
      await Base.create(baseData);
      console.log(`Base created: ${baseData.name}`);
    } else {
      console.log(`Base already exists: ${baseData.name}`);
    }
  }

  return await Base.find({ name: { $in: baseList.map((b) => b.name) } });
}
