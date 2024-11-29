pragma circom 2.1.9;

include "./ticket_verifier.circom";

template TicketVerifier(m, n) {
    signal input ticket_date;
    signal input ticket_month;
    signal input ticket_year;
    signal input hour;
    signal input minutes;
    signal input AmOrPmAsPerTicket;
    signal input nameAsPerTicket[m];
    signal input nameAsPerOrganizer[m];
    signal input nameInTicket[n];
    signal input actualName[n];
    signal input hourAsPerOrganizer;
    signal input minutesAsPerOrganizer;
    signal input AmOrPmAsPerOrganizer;
    signal input event_date;
    signal input event_month;
    signal input event_year;

    TicketDateChecker()(ticket_date, ticket_month, ticket_year, event_date, event_month, event_year);
    TicketTimeChecker()(hour, minutes, AmOrPmAsPerTicket, hourAsPerOrganizer, minutesAsPerOrganizer, AmOrPmAsPerOrganizer);
    EventNameChecker(m)(nameAsPerTicket, nameAsPerOrganizer);
    OrganizerNameChecker(n)(nameInTicket, actualName);
}