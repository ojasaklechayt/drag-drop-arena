const router = require('express').Router();
const { createTemplate, getAllTemplates, getSpecificTemplate, updateTemplate, deleteTemplate } = require('../controllers/template-controller');

// Create a new template
router.post('/templates', createTemplate);

// Get all templates
router.get('/templates', getAllTemplates);

// Get a specific template by ID
router.get('/templates/:id', getSpecificTemplate);

// Update a template by ID
router.put('/templates/:id', updateTemplate);

// Delete a template by ID
router.delete('/templates/:id', deleteTemplate);

module.exports = router;
