require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Define the environment variables to read
const envVars = [
  'REACT_APP_CLOUDINARY_CLOUD_NAME',
  'REACT_APP_CLOUDINARY_UPLOAD_PRESET',
  'REACT_APP_CLOUDINARY_API'
];

// Read the environment variables from process.env
const envContent = envVars.map(varName => {
  const value = process.env[varName];
  if (!value) {
    console.error(`Error: Environment variable ${varName} is not set`);
    process.exit(1);
  }
  return `${varName}=${value}`;
}).join('\n');

// Write the environment variables to a .env file in the frontend directory
const envFilePath = path.join(__dirname, 'frontend', '.env');
fs.writeFileSync(envFilePath, envContent, 'utf8');

console.log('.env file created successfully with the following content:');
console.log(envContent);