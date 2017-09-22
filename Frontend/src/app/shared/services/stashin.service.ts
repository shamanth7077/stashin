import { Http, Response, Headers, RequestOptions  }  from '@angular/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { UserService } from './user.service';
import {MockOwner} from '../data/mock_input';
import {Owner} from '../models/owner.class';
import {Insurer} from '../models/insurer.class';
import { Asset } from '../models/asset.class';
import {Subject} from "rxjs/Subject";

@Injectable()

export class StashinService{
    private COAF: string;
    private Url:any;
    public coafObs: Subject<string>;


    constructor(private http:Http,
    private UrlData:UrlService,
    private userService:UserService){
    this.coafObs=new Subject();
    this.setCOAF(undefined);
    this.Url=this.UrlData;
  }
  refresh() {
      this.setCOAF(undefined);
      this.setCOAF(this.COAF);
  }
  getCOAF(): string {
      return this.COAF;
  }
  setCOAF(_COAF: string) {
      this.COAF = _COAF;
      this.coafObs.next(this.COAF);
  }
deploycontract(_coaf:string): Observable<string>{
  const headers=new Headers();
  headers.append('Content-Type','application/json');
  const body={
    name:"stashin",
    coaf:_coaf
  };
  console.log(body);
  return this.http.post(this.Url.deploy, body, { headers: headers })
      .map((response: Response) => <any> response)
      .catch(err => Observable.throw(err));
}
create_owner(own: Owner): Observable<string> {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const body = {
       name: own.name,
       SSN: own.SSN,
       coaf:own.COAF,
       status:own.status,
       contactnumber:own.contactnumber,
       age:own.age,
       address:own.address
   };
   console.log(body);
   return this.http.post(this.UrlData.createowner(), body, { headers: headers })
       .map((response: Response) => <any> response)
       .catch(err => Observable.throw(err));
}
create_asset(ass: Asset): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
        category: ass.category,
        value: ass.amt,
        availableforsale:ass.availableforsale,
        coaf:this.COAF,
        houseno:ass.houseno,
        amlicenceplate:ass.amlicenceplate,
        automobilemodel:ass.automobilemodel,
        automobilemark:ass.automobilemark,
        enginesize:ass.enginesize,
        street:ass.street,
        postalcode:ass.postalcode,
    };
    console.log(body);
    return this.http.post(this.UrlData.createasset(), body, { headers: headers })
        .map((response: Response) => <any> response)
        .catch(err => Observable.throw(err));
}
getMe(coaf: string): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting providers for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getMe(coaf), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}
getInsurer(coaf: string): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting providers for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getInsurer(coaf), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}
getInfo(coaf: string,id:number): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting providers for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getInfo(coaf,id), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}
/*
getContractInfo(coaf: string): Observable<any> {
    let node = this.userService.getUser();
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting contract with coaf ${coaf} from node ${node}`);
    return coaf;
}*/
/*
getowners(coaf: string): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting owners for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getowners(coaf), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}*/

getassets(coaf: string): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting assets for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getassets(coaf), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}
getassetsforsale(coaf: string): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`Getting assets for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getassetsforsale(coaf), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}
record_sale(_assetforsaleid:number,_assetid:number,node:number,node2:number,coaf:string): Observable<string> {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const body = {
       assetid:_assetid,
       assetforsaleid:_assetforsaleid,
   };
   console.log(body);
   return this.http.post(this.UrlData.recordsaleofasset(this.COAF,node,node2), body, { headers: headers })
       .map((response: Response) => <any> response)
       .catch(err => Observable.throw(err));
}
create_insurer(ins: Insurer): Observable<string> {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const body = {
       name: ins.name,
       ampolicy:ins.ampolicy,
       housepolicy:ins.housepolicy,
       housepremieum:ins.housepremieum,
       automobilepremieum:ins.automobilepremieum
   };
   console.log(body);
   return this.http.post(this.UrlData.createinsurer(this.COAF), body, { headers: headers })
       .map((response: Response) => <any> response)
       .catch(err => Observable.throw(err));
}
insure_asset(ass:Asset,ins: Insurer,node:number,coaf:string): Observable<string> {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const body = {
       name: ins.name,
       id:ass.id
   };
   console.log(body);
   return this.http.post(this.UrlData.insureasset(this.COAF,node), body, { headers: headers })
       .map((response: Response) => <any> response)
       .catch(err => Observable.throw(err));
}
getInsurers(coaf: string): Observable<any> {
    let options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(`StashService - Getting providers for contract with coaf ${coaf}`);
    return this.http.get(this.UrlData.getProviders(coaf), options)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw('Server error'));
}

}
