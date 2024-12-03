import { AnonAadhaarCore } from "@anon-aadhaar/core";
export interface EventDetails {
    name: string;
    date: Date;
    venue: string;
    maxTickets: number;
}
export interface OrganizerConfig {
    name: string;
    seed: string;
}
export interface TicketVerificationResult {
    isValid: boolean;
    reason?: string;
}
export interface Ticket {
    ticketId: string;
    aadhaarProof: AnonAadhaarCore | null;
    ticketproof: string | null;
    eventDetails: {
        name: string;
        date: string;
        time: string;
        place: string;
    };
    organizerDetails: {
        name: string;
    };
    issuedAt: string;
    isVerified: boolean;
}
export declare const sampleTicket: Ticket;
