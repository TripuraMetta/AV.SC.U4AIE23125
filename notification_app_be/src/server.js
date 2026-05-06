const express = require("express");
require("dotenv").config();

const Log = require("../../logging_middleware");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

    await Log(
        "backend",
        "info",
        "route",
        "Root endpoint accessed"
    );

    res.status(200).json({
        success: true,
        message: "Backend server is running successfully"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});