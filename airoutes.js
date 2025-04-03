const express = require('express');
const aiController = require('../controllers/aiController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/generate-career-content', aiController.generateCareerContent);
router.post('/suggest-career-path', aiController.suggestCareerPath);
router.post('/generate-growth-chart', aiController.generateGrowthChart);

module.exports = router;