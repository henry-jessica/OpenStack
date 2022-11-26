

    export interface Address {
        city: string;
        county: string;
        line1: string;
        eircode: string;
    }

    export interface IEvent {
        _id: string, 
        name: string;
        description: string;
        contactNumber: string;
        contact_email: string;
        eventDateStarts: Date;
        eventDateEnds: Date;
        createdDate: Date;
        address: Address;
        startsPrice: number;
        refundpolicy: string;
        currency: string;
        // tags: string[];
        urlImg:string;
    }


    