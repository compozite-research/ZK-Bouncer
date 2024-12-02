export * from './zkbouncer';
export * from './types';

import { ZKBouncer } from './zkbouncer';
import { log } from 'console';

const bouncer = new ZKBouncer("ColdPlay", "Tech Conference 2024", "2024-12-01", "10:00PM", "New Street, Bangalore");

// Generating a ticket (without proofs)
const ticket = await bouncer.generateTicket();

// Generating a verifiable ticket
const verifiableTicket = await bouncer.generateVerifiableTicket(ticket, "./myaadhaar.jpg");

