import express from "express";
import documentsRoutes from "./routes/documents.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(documentsRoutes);
app.use(healthRoutes);

app.use(errorHandler);

export default app;
