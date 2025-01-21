require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "Pricing_module_2_back",  // Name of your application
      script: "server.js",           // Path to your main Node.js server file
      env: {                         // Environment variables for development
        PORT: process.env.PORT,
        DB_URI: process.env.DB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
      },
      env_production: {              // Environment variables for production
        PORT: process.env.PORT,
        DB_URI: process.env.DB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
      },
    },
  ],
  deploy: {
    production: {
    user: "root",
    host: "62.72.6.245",
        ref: "origin/main",           // Git reference (e.g., main branch)
      repo: "https://Parasv17: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@github.com/Heydo-Tech/pricing-module-2_back.git",  // Replace with your repository URL
      path: "/root/pricing_module_2/pricing-module-2_back", // Replace with the path where the repo will be deployed on your server
      "post-deploy":
        "npm install && pm2 reload pm2.config.js --env production",  // Install dependencies and reload the app
    },
  },
};
