import { Owner } from './owner.class';

export class Asset {
    constructor(
        public own: Owner,
        public id: number,
        public category: string,
        public amlicenceplate:number,
        public automobilemodel:string,
        public automobilemark:string,
        public enginesize:number,
        public variant:string,
        public amt: number,
        public houseno:number,
        public street:string,
        public postalcode:number,
        public availableforsale:boolean,
        public insured:boolean,
        public insurername:string,
        public typeofinsurance:string
      ) {}
}
