import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {UserService} from "./user.service";

@Injectable()
export class UrlService {
    public url    = 'http://localhost:8000';
    public deploy = this.url + '/api/0/deploy_sol';
    private node: number;

    constructor(private userService: UserService) {
        this.node = +this.userService.getUser();
        if(this.node == 5){
            this.node = 0;
        }
        if(this.node == 6){
            this.node = 1;
        }
        this.userService.userObs.subscribe(
            user => {
              this.node = +user
              if(this.node == 5){
                  this.node = 0;
              }
              if(this.node == 6){
                  this.node = 1;
              }
            },
            err => console.log(err)
        );
    }

    insureasset(COAF: string,node:number): string {
        return this.url + '/api/'+node+'/'+ this.node + '/' + COAF + '/'+'insure_asset';
    }
    recordsaleofasset(COAF: string,node:number,node2:number): string {
        return this.url + '/api/'+node+'/'+ node2 + '/' + COAF + '/'+'record_sale';
    }

    getMe(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_owner';
    }

    getProviders(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_providers';
    }

    getassets(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_assets';
    }
    getassetsforsale(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_assetsforsale';
    }

    announceContract(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/announce';
    }

    updateContract(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/update';
    }

    createowner(): string {
        return this.url + '/api/' + this.node +  '/create_owner';
    }

    createasset(): string {
        return this.url + '/api/' + this.node +  '/add_asset';
    }
    createinsurer(COAF:string): string {
        return this.url + '/api/' + this.node +'/'+COAF+  '/add_insurer';
    }
    getInsurer(COAF: string): string {

        return this.url + '/api/' + this.node + '/' + COAF + '/get_insurer';
    }
    getInfo(COAF: string,id:number): string {
        return this.url + '/api/' + this.node + '/' + COAF +'/'+id+ '/get_assetinfo';
    }



}
