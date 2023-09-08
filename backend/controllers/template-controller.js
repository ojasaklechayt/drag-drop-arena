const Template = require("../models/template-model");

const createTemplate = async (req, res) => {
    try {
        const { name, leftlabels, rightdata, rightlabels, righttitle } = req.body;
        const lowerCaseName = name.toLowerCase();
        const existingTemplate = await Template.findOne({ name: lowerCaseName });
        if (existingTemplate) {
            return res.status(422).json({ message: "Template with the same name already exists" });
        }
        const newTemplate = new Template({ name, leftlabels, rightdata, rightlabels, righttitle });
        await newTemplate.save();
        res.status(201).json({ message: "Template Saved Successfully", template: newTemplate });
    } catch (error) {
        console.error("Error creating template:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createTemplate };



const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find().lean();
        res.status(200).json(templates);
    } catch (error) {
        console.error("Error getting all templates:", error);
        res.status(500).send("Error getting all templates");
    }
};

const getSpecificTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const template = await Template.findById(templateId).lean();
        if (!template) {
            return res.status(404).send('Template not found');
        }
        res.status(200).json(template);
    } catch (error) {
        console.error("Error getting specific template:", error);
        res.status(500).send("Error getting specific template");
    }
};

const updateTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const { name, leftlabels, rightdata, rightlabels, righttitle } = req.body;
        const lowerCaseName = name.toLowerCase();
        const existingTemplate = await Template.findOne({ name: lowerCaseName });

        if (existingTemplate && existingTemplate._id.toString() !== templateId) {
            return res.status(422).json({ message: "Template with the same name already exists" });
        }

        const updatedTemplate = await Template.findByIdAndUpdate(
            templateId,
            { name, leftlabels, rightdata, rightlabels, righttitle },
            { new: true }
        );

        if (!updatedTemplate) {
            return res.status(404).send('Template not found');
        }

        res.status(200).json(updatedTemplate);
    } catch (error) {
        console.error("Error updating template:", error);
        res.status(500).send("Error updating template");
    }
};


const deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;

        const deletedTemplate = await Template.findByIdAndDelete(templateId);
        if (!deletedTemplate) {
            return res.status(404).send('Template not found');
        }
        res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
        console.error("Error deleting template:", error);
        res.status(500).send("Error deleting template");
    }
};

module.exports = {
    createTemplate,
    getAllTemplates,
    getSpecificTemplate,
    updateTemplate,
    deleteTemplate
};
