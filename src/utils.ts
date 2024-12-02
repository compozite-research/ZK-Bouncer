import RNQRGenerator from 'rn-qr-generator';

import { Ticket } from './types'; // Importing the Ticket interface
import { AnonAadhaarCore } from '@anon-aadhaar/core'; // Assuming the proof type is from this module

/**
 * Function to generate a ticket
 * @param aadhaarProof - Aadhaar proof object generated during the proof process
 * @param eventDetails - Details of the event
 * @param organizerDetails - Details of the organizer
 * @returns Ticket - Generated ticket object
 */
export function generateTicket(
  aadhaarProof: AnonAadhaarCore,
  eventDetails: { name: string; date: string; time: string; place: string },
  organizerDetails: { name: string; contactInfo: string }
): Ticket {
  const ticketId = `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`; // Unique ticket ID
  const issuedAt = new Date().toISOString(); // Current timestamp

  // Create the ticket object
  const ticket: Ticket = {
    ticketId,
    aadhaarProof: null,
    ticketproof: null,
    eventDetails,
    organizerDetails,
    issuedAt,
    isVerified: false, // By default, tickets are not verified until validated
  };

  return ticket;
}

export async function decodeQRCodeFromFile(base64: string): Promise<string> {
  const detectedQRCodes = await RNQRGenerator.detect({ base64 });
  const { values } = detectedQRCodes;

  if (!values[0]) {
    throw new Error('[decodeQRCodeFromImage]: QR Code value is undefined');
  }

  return values[0];
}

export function getCurrentDateTimeInIST(): { date: string; time: string } {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (UTC+5:30)
  const istDate = new Date(now.getTime() + istOffset);

  // Format the date as YYYY-MM-DD
  const date = istDate.toISOString().split('T')[0];

  // Format the time in 12-hour format with AM/PM
  let hours = istDate.getUTCHours();
  let minutes = istDate.getUTCMinutes();
  const isPM = hours >= 12;

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes with a leading zero
  const amPm = isPM ? 'PM' : 'AM';

  const time = `${hours}:${formattedMinutes} ${amPm}`;

  return { date, time };
}

export function extractDateAndTimeComponents(date: string, time: string) {
  const [year, month, day] = date.split('-').map((part) => parseInt(part, 10));

  const timeParts = time.split(' ');
  const [hour, minute] = timeParts[0].split(':').map((part) => parseInt(part, 10));
  const period = timeParts[1];

  return {
    year,
    month,
    day,
    hour,
    minute,
    period,
  };
}

export function stringToBytes(input: string): number[] {
  const encoder = new TextEncoder();
  return Array.from(encoder.encode(input));
}

export function encodePeriod(period: string): number {
  if (period === "AM") {
    return 1;
  } else if (period === "PM") {
    return 0;
  } else {
    throw new Error("Invalid period: Expected 'AM' or 'PM'");
  }
}