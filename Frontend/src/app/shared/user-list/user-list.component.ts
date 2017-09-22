import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StashinService } from '../services/stashin.service';
import { Asset } from '../models/asset.class';
import {MockInsurer} from '../data/mock_input';
import {MockAsset} from '../data/mock_input';
import {Insurer} from '../models/insurer.class';
    import { Router } from '@angular/router';
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    @Input() type: string;
    @Input() users: any[];
    private Insurers:any[];
    private coaf: string;
    private ins: Insurer;
    private node:number;
    private ass:Asset;
    private assetinfo:Asset;
    private assetid:number;
    private quotes:number[];
    private quote1:number;
    private quote2:number;
    private flag:boolean;
    private flag2:boolean;
    private insured:boolean;
    private category:string;

    @Output() bo = new EventEmitter<Asset>();
    // @Output() regNodes = new EventEmitter<number[]>();

    private user: string;
    // private users: any[];

    constructor(private StashService: StashinService,  private router: Router) {
        this.users = [];
        this.quotes=[];
        this.coaf = this.StashService.getCOAF();
        this.ins=MockInsurer.ins;
        this.assetinfo=MockAsset.ass;
        this.quote1=Math.round(Math.random()*(10000-5000)+5000);
        this.quote2=Math.round(Math.random()*(10000-5000)+5000);
        this.assetid=null;
        this.node=null;
        this.flag=false;
        this.flag2=false;
        this.insured=false;

        this.ass=MockAsset.ass;
        this.StashService.coafObs.subscribe(
            res => this.coaf = res
        );
    }

    // getUsers() {
    //     this.StashService.getProviders(this.coaf)
    //         .subscribe(
    //             res => {
    //                 this.users = res.providers;
    //                 const regIds = this.users.map(x => x.NodeId);
    //                 this.regNodes.emit(regIds);
    //                 console.log(this.users);
    //             },
    //             err => console.log(err)
    //     );
    // }

    checkType() {
        switch (this.type) {
            case 'owner':
                this.user = 'owner';
                break;
            case 'asset':
                this.user = 'asset';
                break;
            default:
                this.user = 'User';
        }
    }

    deleteUser() {}
   AssignInsurer(user:Asset){
      this.user='insurer';
      this.ass =user;
      this.category=user.category;



      this.getInsurers();


   }
   getInsurers() {
     if(this.coaf){
       this.StashService.getInsurers(this.coaf)
           .subscribe(
               res => {
                   this.Insurers = res.providers;

                   console.log(this.Insurers);
               },
               err => console.log(err)
           );
         }
   }
   create(ins2:any){
     this.ins=ins2;

     this.node=ins2.NodeId;
     this.StashService.insure_asset(this.ass,this.ins,this.node,this.coaf)
         .subscribe(() => {
             alert('Successfully insured asset');
             //this.router.navigate(['/home']);
             this.insured=true;
             this.user='owner';

             this.StashService.refresh();
         },
         err => alert('Error insuring asset')
         );

   }
   GetAssetInfo(user:Asset){
     this.assetid=user.id;
     this.user="assetinfo";
     this.StashService.getInfo(this.coaf,this.assetid)
         .subscribe(
             res => {
                     this.assetinfo.category=res.category;

                  if(res.category=="Automobile"){

                    this.assetinfo.amlicenceplate=res.amlicenceplate;
                    this.assetinfo.automobilemodel=res.automobilemodel;

                    this.assetinfo.automobilemark=res.automobilemark;
                    this.assetinfo.enginesize=res.enginesize;
                  }
                  else{
                    this.assetinfo.houseno=res.houseno;
                    this.assetinfo.street=res.street;
                    this.assetinfo.postalcode=res.postalcode;
                  }

                 console.log(this.Insurers);
             },
             err => console.log(err)
         );
    }
    getquote1(a:number){
      this.quotes[0]=Math.round(Math.random()*(10000-5000)+5000);
      this.flag=true;
    }
    getquote2(){
      this.quotes[1]=Math.round(Math.random()*(10000-5000)+5000);
      this.flag2=true;
    }
    categoryautomobile(){

      if(this.category==='Automobile'){
        return true;
      }
      else{
        return false;
      }

    }
    categoryhouse(){
      if(this.category==='House'){
        return true;

      }
      else{
        return false;
      }
    }
    open(){

    }

return(){
  this.user='asset';
}

    ngOnInit() {
        this.checkType();
        // this.getUsers();
    }
}
