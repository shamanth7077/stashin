import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { StashinService } from '../services/stashin.service';
import { Router } from '@angular/router';
import { Owner } from '../models/owner.class';
import { Asset } from '../models/asset.class';
import { Insurer } from '../models/insurer.class';
import { MockAsset, MockOwner,MockInsurer } from '../data/mock_input';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    @Input() owner: Owner;
    @Input() insurer: Insurer;
    @Input() COAF: string;
    @Input() type: string;
    @Output() refresh = new EventEmitter<boolean>();

    private user: string;
    private newowner: Owner;
    private newasset: Asset;
    private newinsurer:Insurer;
    private create: any;

    constructor(private StashService: StashinService,private users: UserService,
                private router: Router) {
        this.initInput();
        this.users.userObs.subscribe(
            res => {
              console.log('userform init')
              this.newowner.name = '';
              this.newowner.age = null;
              this.newowner.contactnumber = null;
              this.newowner.SSN = null;
              this.newowner.status = '';
              this.newowner.address = '';
            },
            err => console.log('Error fetching changed user')
        );

    }

    initInput() {
        this.newowner = MockOwner.own;
        this.newasset = MockAsset.ass;
        this.newinsurer=MockInsurer.ins;
    }

    clearInput() {
        this.newowner.name = '';
        //this.newowner = null;
    }

    checkType() {
        switch (this.type) {
            case 'owner':
                this.user = 'owner';
                this.create = this.createowner;
                break;
            case 'asset':
                this.user = 'asset';
                this.create = this.createasset;
                break;
            case 'insurer':
                this.user='insurer';
                this.create= this.createinsurer;
            default:
                this.user = 'User';
        }
    }

    inputOK(inputs: any[]) {
        for (let input of inputs) {
            if (!input) {
                alert('Please fill in all the required fields');
                return false;
            }
        }
        return true;
    }

    createowner() {
        this.newowner.COAF = this.COAF;
        if (!this.inputOK([this.newowner.name,this.newowner.SSN,this.newowner.status])) {
            return;
        }
        if(this.COAF){
        this.StashService.create_owner(this.newowner)
            .subscribe(() => {
                alert('Successfully added owner to the Stashin contract');
                this.clearInput();
                //this.router.navigate(['/home']);
                this.StashService.refresh();
            },
            err => alert('Error adding owner to the Stashin contract')
            );
          }
    }

    createasset() {
        // this.newBO.sp.name = 'joeri';
        this.newasset.own.COAF = this.COAF;
        if (!this.inputOK([this.newasset.category,this.newasset.availableforsale])) {
            return;
        }
        this.StashService.create_asset(this.newasset)
            .subscribe(() => {
                    alert('Successfully added asset to the Stashin contract');
                    this.clearInput();
                          this.StashService.refresh();
                },
                err => alert('Error adding asset to the Stashin contract')
            );
    }
    createinsurer() {
        this.newinsurer.COAF = this.COAF;

        this.StashService.create_insurer(this.newinsurer)
            .subscribe(() => {
                alert('Successfully added insurer to the Stashin contract');
                this.clearInput();
                //this.router.navigate(['/home']);
                this.StashService.refresh();
            },
            err => alert('Error adding insurer to the Stashin contract')
            );
    }

    ngOnInit() {
        this.checkType();
    }
}
