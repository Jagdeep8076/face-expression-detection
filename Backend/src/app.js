const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://face-expression-detection-10a1.onrender.com"
        ],
        credentials: true
    })
);

const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/song.routes");

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// Frontend build
app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, "../public", "index.html")
    );
});

module.exports = app;
