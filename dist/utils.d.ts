import { Ticket } from './types';
import { AnonAadhaarCore } from '@anon-aadhaar/core';
/**
 * Function to generate a ticket
 * @param aadhaarProof - Aadhaar proof object generated during the proof process
 * @param eventDetails - Details of the event
 * @param organizerDetails - Details of the organizer
 * @returns Ticket - Generated ticket object
 */
export declare function generateTicket(aadhaarProof: AnonAadhaarCore, eventDetails: {
    name: string;
    date: string;
    time: string;
    place: string;
}, organizerDetails: {
    name: string;
    contactInfo: string;
}): Ticket;
export declare function decodeQRCodeFromFile(base64: string): Promise<string>;
export declare function getCurrentDateTimeInIST(): {
    date: string;
    time: string;
};
export declare function extractDateAndTimeComponents(date: string, time: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    period: string;
};
export declare function stringToBytes(input: string): number[];
export declare function encodePeriod(period: string): number;
