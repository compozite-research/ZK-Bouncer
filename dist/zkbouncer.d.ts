import { AnonAadhaarCore } from '@anon-aadhaar/core';
import { Ticket } from './types';
export declare const NullifierSeed = 24567876542;
/**
 * ZKBouncer is a class that facilitates proof based ticket to prevent it from reselling.
 * It is a server side infrastructure to make the ticket non-transferrable and preventing reselling thereby.
**/
export declare class ZKBouncer {
    name: string;
    event: string;
    date: string;
    time: string;
    place: string;
    /**
     * Constructs an instance of ZKBouncer with event and organizer details.
     * @param name - The name of the organizer.
     * @param event - The name of the event.
     * @param date - The date of the event (YYYY-MM-DD format).
     * @param time - The time of the event (HH:MM AM/PM format).
     */
    constructor(name: string, event: string, date: string, time: string, place: string);
    /**
     * Generates a proof for Aadhaar QR code data.
     * @param qr_file_path - The file path of the Aadhaar QR code image.
     * @returns A promise that resolves to an instance of AnonAadhaarCore containing the proof.
     */
    generateIDProof(qr_file_path: string): Promise<AnonAadhaarCore>;
    /**
     * Verifies the provided Aadhaar proof.
     * @param anonAadhaarPCD - The proof generated from Aadhaar data.
     * @param useTestAadhaar - Whether to use test Aadhaar data for verification (default: false).
     * @returns A promise that resolves to true if verification succeeds, or false otherwise.
     */
    verifyAadhaar(anonAadhaarPCD: AnonAadhaarCore, useTestAadhaar?: boolean): Promise<boolean>;
    /**
     * generates a ticket (without proofs)
     * @param eventDetails - Details of the event
     * @param organizerDetails - Details of the organizer
     * @returns Ticket - Generated ticket object
     */
    generateTicket(): Ticket;
    /**
     * Processes a ticket by generating and verifying its proof.
     * @param qr_code_path - The file path of the Aadhaar QR code image.
     * @param useTestAadhaar - Whether to use test Aadhaar data for verification (default: false).
     * @returns A promise that resolves to true if ticket processing succeeds, or false otherwise.
     */
    processTicket(qr_code_path: string, useTestAadhaar?: boolean): Promise<boolean>;
    /**
     * Generates a verifiable ticket with Aadhaar proof and ticket proof.
     * @param ticket - The ticket object containing event and organizer details.
     * @param qr_code_path - The file path of the Aadhaar QR code image.
     * @returns A promise that resolves to the ticket object updated with proofs.
     */
    generateVerifiableTicket(ticket: Ticket, qr_code_path: string): Promise<Ticket>;
    /**
     * Generates a proof for the ticket using Circom circuits.
     * @param ticket - The ticket object containing event and organizer details.
     * @returns A promise that resolves to the path of the generated proof file.
     */
    generateTicketProof(ticket: Ticket): Promise<string>;
}
