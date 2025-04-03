const Career = require('../models/careerModel');
const User = require('../models/userModel');
const { execPythonScript } = require('../utils/pythonRunner');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.generateCareerContent = catchAsync(async (req, res, next) => {
  const { sector } = req.body;
  
  // Check if career exists in database first
  const existingCareer = await Career.findOne({ sector });
  if (existingCareer) {
    return res.status(200).json({
      status: 'success',
      data: {
        career: existingCareer
      }
    });
  }

  // If not found, generate with AI
  const scriptPath = '../ai/career_content_generator.py';
  const args = [sector];
  
  const result = await execPythonScript(scriptPath, args);
  if (!result || result.error) {
    return next(new AppError('Failed to generate career content', 500));
  }

  // Save the generated content to database
  const newCareer = await Career.create({
    sector,
    title: result.title,
    description: result.description,
    category: result.category,
    difficulty: result.difficulty,
    jobGrowth: result.jobGrowth,
    studyGuidance: result.studyGuidance,
    futureScope: result.futureScope,
    expertExperiences: result.expertExperiences,
    freeCourses: result.freeCourses,
    relatedJobs: result.relatedJobs,
    growthChart: result.growthChart
  });

  res.status(201).json({
    status: 'success',
    data: {
      career: newCareer
    }
  });
});

exports.suggestCareerPath = catchAsync(async (req, res, next) => {
  const { skills, interests, userId } = req.body;
  
  const scriptPath = '../ai/career_path_suggestor.py';
  const args = [JSON.stringify({ skills, interests })];
  
  const result = await execPythonScript(scriptPath, args);
  if (!result || result.error) {
    return next(new AppError('Failed to generate career suggestions', 500));
  }

  // Update user's career suggestions history
  await User.findByIdAndUpdate(userId, {
    $push: {
      careerSuggestions: {
        skills,
        interests,
        suggestions: result,
        date: new Date()
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      suggestions: result
    }
  });
});

exports.generateGrowthChart = catchAsync(async (req, res, next) => {
  const { sector } = req.body;
  
  const scriptPath = '../ai/growth_chart_generator.py';
  const args = [sector];
  
  const result = await execPythonScript(scriptPath, args);
  if (!result || result.error) {
    return next(new AppError('Failed to generate growth chart data', 500));
  }

  res.status(200).json({
    status: 'success',
    data: {
      chartData: result
    }
  });
});