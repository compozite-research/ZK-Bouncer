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

// Define the structure of the ticket
export interface Ticket {
  ticketId: string;           // Unique identifier for the ticket
  aadhaarProof: AnonAadhaarCore | null;  // Aadhaar proof (e.g., from the proof generation process)
  ticketproof: string | null;
  eventDetails: {
    name: string;
    date: string;
    time: string;
    place: string;
  };  // Event details such as name, time, and place
  organizerDetails: {
    name: string;              // Name of the organizer
  };
  issuedAt: string;           // Timestamp of when the ticket was issued
  isVerified: boolean;        // Whether the ticket has been verified
}

// The organiser issued this ticket
export const sampleTicket: Ticket = {
  ticketId: "ticket-12345",
  aadhaarProof: {
    "type": "anon-aadhaar",
    "id": "504f98fd-dcbc-45eb-b4ff-bd7a98438149",
    "claim": {
      "pubKey": [
        "1388327314901276273497603053049831573",
        "1288770065561824590310204825945893597",
        "347944061738351220497875430520412587",
        "2203925894492670478365294907843212566",
        "349976987200639440095663304686403400",
        "1858127966046453767090107272117170604",
        "98944980972575232708304306395068367",
        "72308052871443505790154443070931847",
        "171399417356978051390838864702414084",
        "2253675451749563963224572465143971881",
        "442208872747909568780648632811615762",
        "683454141347236191691262238349526517",
        "1671407496108483722945952438837825234",
        "1087766175397090383868214821691649424",
        "13091038325609962763769551933681621",
        "2021829298345573369225939328286843929",
        "3294796001033061829975954746704750"
      ],
      "signalHash": "10010552857485068401460384516712912466659718519570795790728634837432493097374",
      "ageAbove18": null,
      "gender": null,
      "pincode": null,
      "state": null
    },
    "proof": {
      "groth16Proof": {
        "pi_a": [
          "2735844006961134311036138185899083185011719000384692801922761146768792743531",
          "21755462453050566630956026954137686478573617281941301473631799718441757929929",
          "1"
        ],
        "pi_b": [
          [
            "201003386556797039771404946870115877123640439915325792095033354321361980697",
            "21838906579846590150336777831275984781593816283689854635956490941545052720858"
          ],
          [
            "4714615273486006232678839384811326885281363861308435934404889134979261384160",
            "4577170204669762671409598620498929863660223457179841772630415538479698712146"
          ],
          [
            "1",
            "0"
          ]
        ],
        "pi_c": [
          "16625805196096581240180666369799849640450542071221264239875748130414158066151",
          "4085559794548070502076599976349791488643695385294776217753952099790766932817",
          "1"
        ],
        "protocol": "groth16",
        "curve": "bn128"
      },
      "pubkeyHash": "18063425702624337643644061197836918910810808173893535653269228433734128853484",
      "timestamp": "1732260600",
      "nullifierSeed": "1234",
      "nullifier": "3057258886538147098995503675919629648392341173185700526200520932181456019067",
      "signalHash": "10010552857485068401460384516712912466659718519570795790728634837432493097374",
      "ageAbove18": "0",
      "gender": "0",
      "pincode": "0",
      "state": "0"
    }
  },
  ticketproof: "",
  eventDetails: {
    name: "Tech Conference 2024",
    date: "2024-12-01",
    time: "10:00PM",
    place: "Convention Center, City Center"
  },
  organizerDetails: {
    name: "John Doe",
  },
  issuedAt: "12:42PM,2024-11-22",
  isVerified: true
};