import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StashinService } from '../services/stashin.service';
import { Asset } from '../models/asset.class';
import {MockInsurer} from '../data/mock_input';
import {MockAsset} from '../data/mock_input';
    import { Router } from '@angular/router';
@Component({
  selector: 'market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {


    private users: any[];
    private COAF: string;
    private node:number;
    private node2:number;
    private assetforsaleid:number;
    private assetid:number;

    private user:string;

    constructor(private StashService: StashinService) {
        this.COAF = this.StashService.getCOAF();
        this.assetid=null;
        this.assetforsaleid=null;
        this.node=null;
        this.node2=null;
        this.launchSubscriptions();
        this.users = [];
        this.user='view';
    }

    launchSubscriptions() {
        this.StashService.coafObs.subscribe(
            res => {
                this.COAF = res;
                this.getUsers();
            }
        );
    }

    getUsers() {
      if(this.COAF){
        alert("entered here");
        this.StashService.getassetsforsale(this.COAF)
            .subscribe(
                res => {
                    this.users = res.assets;
                    console.log(res);
                },
                err => console.log(err)
            );
          }
    }
    switchscreens(user:Asset){
      this.assetforsaleid=user.id;
      this.user='sale';
    }
    return(){
      this.user='view';
    }
    RecordSale(){


      this.StashService.record_sale(this.assetforsaleid,this.assetid,this.node,this.node2,this.COAF)
          .subscribe(
              res => {


                  console.log(res);
              },
              err => console.log(err)
          );
          this.user='view';
    }

    ngOnInit() {

         this.getUsers();
    }
}
