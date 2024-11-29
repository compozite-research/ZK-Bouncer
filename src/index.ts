export * from './zkbouncer';
export * from './types';

import { ZKBouncer } from './zkbouncer';
import { sampleTicket } from './types';
import { log } from 'console';

const bouncer = new ZKBouncer("ColdPlay", "Tech Conference 2024", "2024-12-01", "10:00PM");

bouncer.generateTicketProof(sampleTicket);

log(sampleTicket);