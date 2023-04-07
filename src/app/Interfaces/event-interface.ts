
    export interface IAddress {
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
        category: string;
        eventDateStarts: Date;
        eventDateEnds: Date;
        createdDate: Date;
        address: IAddress;
        startsPrice: number;
        refundpolicy: string;
        currency: string;
        // tags: string[];
        urlImg:string;
        tickets: ITicket[];
    }

      export interface ITicket {
        _id: string;
        title: string
        price: number
        availableSeats: number
      }
      