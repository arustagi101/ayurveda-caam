import { google } from 'googleapis';

export interface SheetData {
  [key: string]: string | number | boolean | null;
}

// Define ImmersionEvent interface to match your types
export interface ImmersionEvent {
  id: string;
  name: string;
  topic: string;
  date: string;
  time: string;
  presenter: string;
  details: string;
  image: string;
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
