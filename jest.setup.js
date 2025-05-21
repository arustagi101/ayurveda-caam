// Mock environment variables
process.env.GOOGLE_API_KEY = 'test-api-key';

// Add any global test setup here
beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
});
