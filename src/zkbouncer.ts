
import { OrganizerConfig, EventDetails, TicketVerificationResult } from "./types";

import { 
    init, 
    prove, 
    verify, 
    AnonAadhaarCore,
    AnonAadhaarArgs,
    InitArgs,
    ArtifactsOrigin
  } from '@anon-aadhaar/core';
  
  export class ZKBouncer {
    private initArgs: InitArgs;
  
    constructor(
      organizerConfig: {
        name: string, 
        seed: string,
        wasmURL: string,
        zkeyURL: string,
        vkeyURL: string
      }
    ) {
      this.initArgs = {
        wasmURL: organizerConfig.wasmURL,
        zkeyURL: organizerConfig.zkeyURL,
        vkeyURL: organizerConfig.vkeyURL,
        artifactsOrigin: ArtifactsOrigin.server
      };
    }
  
    async initialize(): Promise<void> {
      await init(this.initArgs);
    }
  
    async generateProof(args: AnonAadhaarArgs): Promise<AnonAadhaarCore> {
      return await prove(args);
    }
  
    async verifyTicket(
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
  
    // Additional method to combine proof generation and verification
    async processTicket(
      ticketArgs: AnonAadhaarArgs, 
      useTestAadhaar: boolean = false
    ): Promise<boolean> {
      // Generate proof
      const anonAadhaarPCD = await this.generateProof(ticketArgs);
      
      // Verify proof
      return this.verifyTicket(anonAadhaarPCD, useTestAadhaar);
    }
  }