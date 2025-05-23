import { getImmersionEvents } from "@/lib/fetchSheetData";

export async function fetchCalendarData() {
try {
    const sheetId = process.env.IMMERSION_SHEET_ID!;
    const events = await getImmersionEvents(sheetId);

    // Sort events by date (newest first)
    const sortedEvents = [...events].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return {
      events: sortedEvents,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      events: [],
    };
  }    
}


export async function getCurrentYear() {
    return new Date().getFullYear();
}
    