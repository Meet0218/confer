import { createServer } from "http";
import { app } from "./app";
import { initSocket } from "./socket";
import { sequelize } from "./models/index";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
