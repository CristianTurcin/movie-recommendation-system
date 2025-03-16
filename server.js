import express from "express";
import cors from "cors";
import recommendRoutes from "./src/routes/recommendRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Importăm rutele
app.use("/api", recommendRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
