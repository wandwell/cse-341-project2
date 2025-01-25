const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  console.log('Applying User Validation Rules');
  return [
  body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter')
    .matches(/\d/).withMessage('Password must contain 1 number'),
  body('username').isLength({min: 8}).withMessage('Username must contain 8 characters')
  ];
};

const petValidationRules = () => {
  console.log('Applying Pet Validation Rules');
  return [
  body('name').isAlpha('en-US', {ignore: ' '}).withMessage('Please do not use numbers or special characters'),
  body('type').isAlpha('en-US', {ignore: ' '}).withMessage('Please do not use numbers or special characters'),
  body('breed').isAlpha('en-US', {ignore: ' '}).withMessage('Please do not use numbers or special characters'),
  body('owner').isAlpha('en-US', {ignore: ' '}).withMessage('Please do not use numbers or special characters'),
  ];
};

const validate = (req, res, next) => {
  console.log('Validating request...');
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      console.log('Validation passed.');
      return next();
  }
  console.log('Validation errors:', errors.array());
  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));  
  return res.status(422).json({
      errors: extractedErrors,
  });
};

  
module.exports = {
  userValidationRules,
  petValidationRules,
  validate
}