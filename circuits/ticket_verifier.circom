pragma circom 2.1.9;

include "../node_modules/circuits/comparators.circom";

template TicketDateChecker() {
    signal input ticket_date;
    signal input ticket_month;
    signal input ticket_year;

    signal input event_date;
    signal input event_month;
    signal input event_year;

    component eq[3];

    eq[0] = IsEqual();
    eq[0].in[0] <== ticket_date;
    eq[0].in[1] <== event_date;

    eq[1] = IsEqual();
    eq[1].in[0] <== ticket_month;
    eq[1].in[1] <== event_month;

    eq[2] = IsEqual();
    eq[2].in[0] <== ticket_year;
    eq[2].in[1] <== event_year;

    eq[0].out === 1;
    eq[1].out === 1;
    eq[2].out === 1;
}

template TicketTimeChecker() {
    signal input hour;
    signal input minutes;
    signal input AmOrPmAsPerTicket;
    
    signal input hourAsPerOrganizer;
    signal input minutesAsPerOrganizer;
    signal input AmOrPmAsPerOrganizer;

    component eq[];

    eq[0] = IsEqual();
    eq[0].in[0] <== hour;
    eq[0].in[1] <== hourAsPerOrganizer;

    eq[1] = IsEqual();
    eq[1].in[0] <== minutes;
    eq[1].in[1] <== minutesAsPerOrganizer;

    eq[0] = IsEqual();
    eq[0].in[0] <== AmOrPmAsPerTicket;
    eq[0].in[1] <== AmOrPmAsPerOrganizer;

    eq[0].out === 1;
    eq[1].out === 1;
    eq[2].out === 1;
}

template EventNameChecker(n) {
    signal input nameAsPerTicket[n];
    signal input nameAsPerOrganizer[n];

    component eq[n];

    for (i = 0; i < n; i++) {
        eq[i] = IsEqual();
        eq[i].in[0] <== nameAsPerTicket[i];
        eq[i].in[1] <== nameAsPerOrganizer[i];
        eq[i].out === 1;
    }
}

template OrganizerNameChecker(n) {
    signal input nameInTicket[n];
    signal input actualName[n];

    compoent eq[n];

    for (i=0; i < n; i++) {
        eq[i] = IsEqual();
        eq[i].in[0] <== nameInTicket[i];
        eq[i].in[1] <== actualName[i];
        eq[i].out === 1;
    }

}

