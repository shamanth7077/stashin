import {Component, OnInit} from '@angular/core';
import { StashinService } from '../services/stashin.service';

@Component({
  selector: 'asset-creation',
  templateUrl: './asset-creation.component.html',
  styleUrls: ['./asset-creation.component.css']
})
export class AssetCreationComponent implements OnInit {
    private COAF: string;
    private users: any[];
    public hasAssets: boolean = false;

    constructor(private StashService: StashinService) {
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.users = [];
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
        this.StashService.getassets(this.COAF)
            .subscribe(
                res => {
                    this.users = res.assets;
                    if(res.assets.length > 0){
                        this.hasAssets = true;
                    }
                    console.log(res);
                },
                err => console.log(err)
            );
          }
    }

    showform(value: boolean) {
      if(value == true){
          this.hasAssets = false;
      }
      else{
          this.hasAssets = true;
      }
    }

    refresh() {
        this.getUsers();
    }

    ngOnInit() {
        if (this.COAF) {
            this.getUsers();
        }
    }
}
