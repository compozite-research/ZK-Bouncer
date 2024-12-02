# ZK-Bouncer

ZK Bouncer is a service which can be used by event organisers to prevent reselling of tickets by people who use their platform to book tickets.


## Where to use?

This service can be used by event organisers who sell tickets on their website and integrate ZKBouncer with it.

## Usage

To integrate the zkbouncer with the ticketing platform, add this code in place of ticket generation logic:

```typescript
import { ZKBouncer } from 'zk-bouncer';

const bouncer = new ZKBouncer("ColdPlay", "Tech Conference 2024", "2024-12-01", "10:00PM", "New Street, Bangalore");

const ticket = await bouncer.generateTicket();

const verifiableTicket = bouncer.generateVerifiableTicket(ticket, "./myaadhaar.jpg");
```

