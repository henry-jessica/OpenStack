import { Time } from "@angular/common";

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
      address: {
          city: string,
          county?: string,
          line1?: string,
          line2?: string,
          eircode: string,
          // _id?:string
          // remove _id property
      },
      startsPrice: number;
      refundpolicy: string;
      currency: string;
      // tags: string[];
      urlImg:string;
      tickets: ITicket[];
      views:number;
    }
    

      export interface ITicket {
        _id: string
        title: string
        price: number
        date:Date
        StartTime: Time
        availableSeats: number
      }
      
      export interface IOrder{
        tickets: ITicket[];
        eventID: string; 
        seatRef:string; 
        user:IUser
      }
      export interface IUser{
        userId:string; 
        username: string; 
        surname:string; 
        DOB: Date; 
        address:IAddress; 
        email: string; 
        contact:number; 
      }