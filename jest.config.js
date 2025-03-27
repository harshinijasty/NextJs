const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust based on your Next.js alias
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
  preset: 'ts-jest',
};

module.exports = createJestConfig(customJestConfig);
