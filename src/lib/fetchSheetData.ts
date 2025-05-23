import { ImmersionEvent } from '@/types/immersion';
import { google } from 'googleapis';

export interface SheetData {
  [key: string]: string | number | boolean | null;
}

export async function fetchSheetData(sheetId: string, sheetName: string = 'Sheet1'): Promise<SheetData[]> {
  try {
    // Initialize the Google Sheets API
    const sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_API_KEY
    });

    // Fetch the data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetName,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.warn('No data found in the sheet');
      return [];
    }

    // Get headers (first row)
    const headers = rows[0].map((header: string) =>
      String(header || '').trim().toLowerCase().replace(/\s+/g, '_')
    );

    // Process data rows
    return rows.slice(1).reduce<SheetData[]>((result, row) => {
      // Skip empty rows
      if (!row.some(cell => String(cell || '').trim() !== '')) {
        return result;
      }

      // Create an object for the current row
      const rowData: SheetData = {};

      headers.forEach((header, index) => {
        if (header) {  // Only process non-empty headers
          rowData[header] = row[index] ? String(row[index]).trim() : null;
        }
      });

      // Only add the row if it has data
      if (Object.values(rowData).some(value => value !== null && value !== '')) {
        result.push(rowData);
      }

      return result;
    }, []);

  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
}

// Helper function to convert sheet data to ImmersionEvent format
export async function getImmersionEvents(sheetId: string): Promise<ImmersionEvent[]> {
  const sheetData = await fetchSheetData(sheetId);
  return sheetData.map((row, index) => ({
    id: String(row.id || `event-${index + 1}`),
    name: String(row.name || 'Untitled Event').trim(),
    topic: String(row.topic || '').trim(),
    date: String(row.date || new Date().toISOString().split('T')[0]).trim(),
    time: String(row.time || '').trim(),
    presenter: String(row.presenter || '').trim(),
    details: String(row.details || '').trim(),
    image: String(row.image || '/assets/immersions/default.jpg').trim(),
    link: String(row.link || '').trim()
  }));
}

export async function getImmersionEventsWithDates(): Promise<{ nextEvent?: ImmersionEvent, upcomingEvents: ImmersionEvent[], pastEvents: ImmersionEvent[] }> {
  try {
    const sheetId = process.env.IMMERSION_SHEET_ID!;
    const events = await getImmersionEvents(sheetId);

    // Separate upcoming and past events
    const now = new Date();
    const allUpcomingEvents = events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Get the next event (first upcoming event)
    const nextEvent = allUpcomingEvents[0] || null;

    // Filter out the next event from the upcoming events list
    const upcomingEvents = nextEvent
      ? allUpcomingEvents.filter(event => event.id !== nextEvent.id)
      : [];

    const pastEvents = events
      .filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      upcomingEvents,
      pastEvents,
      nextEvent,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      upcomingEvents: [],
      pastEvents: [],
      nextEvent: undefined,
    };
  }
};