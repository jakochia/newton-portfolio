const Project = require("../models/Project");

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching projects",
            error: error.message
        });
    }
};

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating project",
            error: error.message
        });
    }
};
