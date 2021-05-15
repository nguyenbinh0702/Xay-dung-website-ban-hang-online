export interface Feedback {
    id : number;
    topic : string;
    customerName : string;
    customerPhone : string;
    customerEmail : string;
    content : string;
    createDate : Date;
    processStatus : boolean;
    responseContent : string
}