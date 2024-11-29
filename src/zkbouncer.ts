import {  
    prove, 
    verify, 
    AnonAadhaarCore,
    AnonAadhaarArgs,
  } from '@anon-aadhaar/core';

import { Circomkit } from 'circomkit';
import { Ticket } from './types';
import { processAadhaarArgs } from '@anon-aadhaar/react';
import { decodeQRCodeFromFile, encodePeriod, extractDateAndTimeComponents, stringToBytes } from './utils';

export const NullifierSeed = 24567876542;

/**
 * ZKBouncer is a class that facilitates proof based ticket to prevent it from reselling.
 * It is a server side infrastructure to make the ticket non-transferrable and preventing reselling thereby.
**/
export class ZKBouncer {
  name: string;
  event: string;
  date: string;
  time: string;

  /**
   * Constructs an instance of ZKBouncer with event and organizer details.
   * @param name - The name of the organizer.
   * @param event - The name of the event.
   * @param date - The date of the event (YYYY-MM-DD format).
   * @param time - The time of the event (HH:MM AM/PM format).
   */
  constructor(name: string, event: string, date: string, time: string) {
      this.name = name;
      this.event = event;
      this.date = date;
      this.time = time;
  }

  /**
   * Generates a proof for Aadhaar QR code data.
   * @param qr_file_path - The file path of the Aadhaar QR code image.
   * @returns A promise that resolves to an instance of AnonAadhaarCore containing the proof.
   */
  async generateIDProof(qr_file_path: string): Promise<AnonAadhaarCore> {
      const qr_data = await decodeQRCodeFromFile(qr_file_path);
      const inputs = await processAadhaarArgs(qr_data, false, NullifierSeed);
      return await prove(inputs);
  }

  /**
   * Verifies the provided Aadhaar proof.
   * @param anonAadhaarPCD - The proof generated from Aadhaar data.
   * @param useTestAadhaar - Whether to use test Aadhaar data for verification (default: false).
   * @returns A promise that resolves to true if verification succeeds, or false otherwise.
   */
  async verifyAadhaar(
      anonAadhaarPCD: AnonAadhaarCore,
      useTestAadhaar: boolean = false
  ): Promise<boolean> {
      try {
          return await verify(anonAadhaarPCD, useTestAadhaar);
      } catch (error) {
          console.error('Ticket verification failed:', error);
          return false;
      }
  }

  /**
   * Processes a ticket by generating and verifying its proof.
   * @param qr_code_path - The file path of the Aadhaar QR code image.
   * @param useTestAadhaar - Whether to use test Aadhaar data for verification (default: false).
   * @returns A promise that resolves to true if ticket processing succeeds, or false otherwise.
   */
  async processTicket(
      qr_code_path: string,
      useTestAadhaar: boolean = false
  ): Promise<boolean> {
      const anonAadhaarPCD = await this.generateIDProof(qr_code_path);
      return this.verifyAadhaar(anonAadhaarPCD, useTestAadhaar);
  }

  /**
   * Generates a verifiable ticket with Aadhaar proof and ticket proof.
   * @param ticket - The ticket object containing event and organizer details.
   * @param qr_code_path - The file path of the Aadhaar QR code image.
   * @returns A promise that resolves to the ticket object updated with proofs.
   */
  async generateVerifiableTicket(ticket: Ticket, qr_code_path: string): Promise<Ticket> {
      const aadhaarproof = await this.generateIDProof(qr_code_path);
      const ticketproof = await this.generateTicketProof(ticket);
      ticket.aadhaarProof = aadhaarproof;
      ticket.ticketproof = ticketproof;

      return ticket;
  }

  /**
   * Generates a proof for the ticket using Circom circuits.
   * @param ticket - The ticket object containing event and organizer details.
   * @returns A promise that resolves to the path of the generated proof file.
   */
  async generateTicketProof(ticket: Ticket): Promise<string> {
      const ticket_event_date_time = extractDateAndTimeComponents(ticket.eventDetails.date, ticket.eventDetails.time);
      const organiser_event_date_time = extractDateAndTimeComponents(this.date, this.time);
      const event_name_as_per_organizer = stringToBytes(this.event);
      const event_name_as_per_ticket = stringToBytes(ticket.eventDetails.name);
      const org_name_as_per_organiser = stringToBytes(this.name);
      const org_name_as_per_ticket = stringToBytes(ticket.organizerDetails.name);
      const period_as_per_ticket = encodePeriod(ticket_event_date_time.period);
      const period_as_per_organiser = encodePeriod(organiser_event_date_time.period);

      const circuit = new Circomkit();
      circuit.compile("TicketVerifier", {
          file: "circuit",
          template: "TicketVerifier",
          params: [event_name_as_per_organizer.length, org_name_as_per_ticket.length],
      });

      const inputs = {
          ticket_date: ticket_event_date_time.day,
          ticket_month: ticket_event_date_time.minute,
          ticket_year: ticket_event_date_time.year,
          hour: ticket_event_date_time.hour,
          minutes: ticket_event_date_time.minute,
          AmOrPmAsPerTicket: period_as_per_ticket,
          nameAsPerTicket: event_name_as_per_ticket,
          nameAsPerOrganizer: event_name_as_per_organizer,
          nameInTicket: org_name_as_per_ticket,
          actualName: org_name_as_per_organiser,
          hourAsPerOrganizer: organiser_event_date_time.hour,
          minutesAsPerOrganizer: organiser_event_date_time.minute,
          AmOrPmAsPerOrganizer: period_as_per_organiser,
          event_date: organiser_event_date_time.day,
          event_month: organiser_event_date_time.month,
          event_year: organiser_event_date_time.year,
      };

      const proof_path = circuit.prove("TicketVerifier", "ticket_verifier_inputs", inputs);
      return proof_path;
  }
}
