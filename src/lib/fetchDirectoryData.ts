
import { google } from 'googleapis';
import { Professional } from '@/types/directory';

/**
 * Converts a string with comma or newline separators into an array of trimmed strings
 */
function stringToArray(value?: string | number | boolean | null): string[] {
  if (!value && value !== 0) return [];
  const str = value.toString().trim();
  if (!str) return [];

  // Check if the string contains newlines
  if (str.includes('\n')) {
    return str.split('\n').map(item => item.trim()).filter(Boolean);
  }

  // Otherwise split by comma
  return str.split(',').map(item => item.trim()).filter(Boolean);
}

/**
 * Capitalizes the first letter of each word in a string
 */
function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats an array of strings to title case
 */
function formatArrayToTitleCase(arr: string[]): string[] {
  return arr.map(item => toTitleCase(item));
}

/**
 * Fetches professional directory data from Google Sheets using the official API
 */
export async function fetchDirectoryData(sheetId: string, sheetName: string = 'Sheet1'): Promise<Professional[]> {
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
      console.warn('No data found in the directory sheet');
      return [];
    }

    // Get headers (first row)
    const headers = rows[0].map((header: string) =>
      String(header || '').trim().toLowerCase().replace(/\s+/g, '_')
    );

    // Map header indices for easier access
    const headerIndices: Record<string, number> = {};
    headers.forEach((header, index) => {
      if (header) {
        headerIndices[header] = index;
      }
    });

    // Process data rows
    return rows.slice(1).map((row, index) => {
      // Helper function to get cell value by header name
      const getValue = (headerName: string): string => {
        const idx = headerIndices[headerName];
        return idx !== undefined && row[idx] ? String(row[idx]).trim() : '';
      };

      return {
        id: `prof-${index + 1}`,
        firstName: toTitleCase(getValue('firstname')),
        lastName: toTitleCase(getValue('lastname')),
        listCategory: getValue('list_og'),
        speciality: formatArrayToTitleCase(stringToArray(getValue('speciality'))),
        services: formatArrayToTitleCase(stringToArray(getValue('services'))),
        languages: formatArrayToTitleCase(stringToArray(getValue('languages'))),
        city: toTitleCase(getValue('city')),
        state: getValue('state').toUpperCase(),
        description: getValue('description'),
        website: getValue('website'),
        image: getValue('image'), // Get image URL from spreadsheet
        membershipLevel: getValue('membership_level'), // CAAM membership level
        certificates: formatArrayToTitleCase(stringToArray(getValue('certificates'))), // Professional certificates
      };
    })
      .filter(prof => {
        // Filter out empty rows and only include professionals where 'list' is 'True'
        return (prof.firstName || prof.lastName) &&
          prof.listCategory.toLowerCase() === 'yes';
      });
  } catch (error) {
    console.error('Error fetching directory data:', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
}


export async function getDirectoryData() {
  const sheetId = process.env.MEMBERS_SHEET_ID!;
  const professionals = await fetchDirectoryData(sheetId);

  // Extract unique values for filters
  const specialities = Array.from(
    new Set(
      professionals.flatMap((p: Professional) => p.speciality)
    )
  ).sort();

  const languages = Array.from(
    new Set(
      professionals.flatMap((p: Professional) => p.languages)
    )
  ).sort();

  // Separate CA cities and non-CA cities
  const caCities: string[] = [];
  const nonCaCities: string[] = [];

  professionals.forEach((p: Professional) => {
    const city = p.city.trim();
    if (city) {
      if (p.state.trim().toUpperCase() === 'CA' || p.state.trim().toUpperCase() === 'CALIFORNIA') {
        if (!caCities.includes(city)) {
          caCities.push(city);
        }
      } else {
        if (!nonCaCities.includes(city)) {
          nonCaCities.push(city);
        }
      }
    }
  });

  // Sort CA cities alphabetically
  caCities.sort();

  // Create the final cities array with CA cities first, then a "Non-CA" option
  const cities = [...caCities];
  if (nonCaCities.length > 0) {
    cities.push('Non-CA');
  }

  // Simplify states to just "CA" and "Non-CA" if there are non-CA professionals
  const hasNonCaProfessionals = professionals.some(
    (p: Professional) => p.state.trim().toUpperCase() !== 'CA' && p.state.trim().toUpperCase() !== 'CALIFORNIA'
  );

  const states = ['CA'];
  if (hasNonCaProfessionals) {
    states.push('Non-CA');
  }

  return {
    professionals: JSON.parse(JSON.stringify(professionals)), // Ensure serialization
    specialities,
    languages,
    cities,
    states,
  };
}