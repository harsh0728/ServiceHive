const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");

const connectDB = require("./config/db");
const pullRequestRoutes = require("./routes/pullRequestRoutes");
const commentRoutes = require("./routes/commentRoutes");
const approvalRoutes = require("./routes/approvalRoutes");

const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/pull-requests", pullRequestRoutes);
app.use('/api/pull-requests', commentRoutes);
app.use('/api/pull-requests', approvalRoutes);
app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => console.log("User disconnected"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
