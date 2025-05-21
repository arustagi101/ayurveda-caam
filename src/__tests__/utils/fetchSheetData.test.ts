import { getImmersionEvents } from '@/utils/fetchSheetData';

// Make sure the Google API key is set in the environment
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY environment variable is not set.');
  console.log('Please set the GOOGLE_API_KEY in your .env.local file:');
  console.log('GOOGLE_API_KEY=your_google_api_key_here');
  process.exit(1);
}

describe('Google Sheets Integration', () => {
  const SHEET_ID = process.env.IMMERSION_SHEET_ID!;

  it('should fetch and process at least 3 immersion events from Google Sheet', async () => {
    console.log('Using Google API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'Not set');
    
    try {
      // This is an integration test that calls the actual Google Sheet
      const events = await getImmersionEvents(SHEET_ID);
      
      // Log the number of events for debugging
      console.log(`Fetched ${events.length} events`);
      
      // Verify we got at least 3 events
      expect(events.length).toBeGreaterThanOrEqual(3);
      
      // Log sample events for verification
      console.log('Sample events:', JSON.stringify(events.slice(0, 3), null, 2));
      
      // Verify the structure of the first 3 events
      events.slice(0, 3).forEach((event, index) => {
        console.log(`Event ${index + 1}:`, JSON.stringify(event, null, 2));
        
        // Check required fields
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('name');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('time');
        expect(event).toHaveProperty('presenter');
        expect(event).toHaveProperty('details');
        expect(event).toHaveProperty('image');
        
        // Check that name and date are not empty
        expect(event.name).toBeTruthy();
        expect(event.date).toBeTruthy();
      });
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error; // Re-throw to fail the test
    }
  }, 60000); // Increased timeout to 60 seconds for API call
});
