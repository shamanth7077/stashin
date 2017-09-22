import { Component } from '@angular/core';
import {MockOwner} from '../data/mock_input';
import {Owner} from '../models/owner.class';
import {StashinService} from '../services/stashin.service';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'owner-creation',
  templateUrl: './owner-creation.component.html',
  styleUrls: ['./owner-creation.component.css']
})
export class OwnerRegisterComponent {


    private COAF: string;
    private own: Owner;
    private user: string;
    private registered = false;
      private name = '';

    constructor(private StashService: StashinService, private users: UserService,private router: Router) {
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.checkRegistered();
        this.user='';
        this.own=MockOwner.own;
        //this.users.setUser(3);
        this.users.userObs.subscribe(
            res => {
              this.registered = false;
              this.COAF = this.StashService.getCOAF();
              console.log(this.COAF)
              this.user='';
              this.own= MockOwner.own;
              this.launchSubscriptions();
              

            },
            err => console.log('Error fetching changed user')
        );


    }

    launchSubscriptions() {
        this.StashService.coafObs.subscribe(res => {
            this.COAF = res;
            this.checkRegistered();
        });

    }

    checkRegistered() {
      if(this.COAF){
        this.StashService.getMe(this.COAF).subscribe(res => {
            if (res.name !== '') {
                console.log(`Node registered to: ${res.name}`);
                this.name=res.name
                this.own.name=res.name;
                this.own.age=res.age;
                this.own.address=res.address;
                this.own.contactnumber=res.contactnumber;
                this.own.SSN=res.SSN;
                this.own.status=res.status;
                this.own.noofassets=res.numberOfAssets;
                this.registered = true;
                this.user='owner';
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
