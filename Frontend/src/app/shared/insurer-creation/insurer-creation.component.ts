import { Component } from '@angular/core';
import {MockInsurer} from '../data/mock_input';
import {Insurer} from '../models/insurer.class';
import {StashinService} from '../services/stashin.service';

@Component({
  selector: 'insurer-creation',
  templateUrl: './insurer-creation.component.html',
  styleUrls: ['./insurer-creation.component.css']
})
export class InsurerCreationComponent {


    private COAF: string;
    private ins: Insurer;
    private user: string;
    private registered = false;
    private name = '';

    constructor(private StashService: StashinService) {
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.checkRegistered();
        this.user='';
        this.ins=MockInsurer.ins;
    }

    launchSubscriptions() {
        this.StashService.coafObs.subscribe(res => {
            this.COAF = res;
            this.checkRegistered();
        });

    }

    checkRegistered() {
      if(this.COAF){
        this.StashService.getInsurer(this.COAF).subscribe(res => {
            if (res.name !== '') {
                console.log(`Node registered to: ${res.name}`);
                this.name=res.name
                this.ins.name=res.name;
                this.ins.ampolicy=res.ampolicy;
                this.ins.housepolicy=res.housepolicy;
                this.ins.noofclients=res.numberOfClients;
                this.ins.housepremieum=res.housepremieum;
                this.ins.automobilepremieum=res.automobilepremieum;
                this.registered = true;
                this.user='insurer';
            }
        });
      }
    }


    // newStash(Stash: owner) {
    //     this.owner = Stash;
    // }

    // newCoaf(COAF: string) {
    //     console.log(`Setting coaf to: ${COAF}`);
    //     this.getUsers(COAF);
    //     this.COAF = COAF;
    // }

    // getUsers(coaf: string) {
    //     this.StashService.getProviders(coaf)
    //         .subscribe(
    //             res => {
    //                 this.users = res.providers;
    //                 const regIds = this.users.map(x => x.NodeId);
    //                 const nodes = [1, 2, 3, 4, 5, 6];
    //                 this.avNodes = nodes.filter(x => regIds.indexOf(x) < 0);
    //                 console.log(this.users);
    //                 console.log(this.avNodes);
    //             },
    //             err => console.log(err)
    //         );
    // }
}
