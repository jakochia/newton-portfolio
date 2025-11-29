const express = require("express");
const router = express.Router();

// Basic project routes
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Projects API is working!",
        data: []
    });
});

router.post("/", (req, res) => {
    res.json({
        success: true,
        message: "Project created!",
        data: req.body
    });
});

module.exports = router;
