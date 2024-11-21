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