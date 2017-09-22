import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './shared/home/home.component';
import { OwnerRegisterComponent } from './shared/owner-creation/owner-creation.component';
import { AssetCreationComponent } from './shared/asset-creation/asset-creation.component';
import { InsurerCreationComponent } from './shared/insurer-creation/insurer-creation.component';
import { MarketPlaceComponent } from './shared/market-place/market-place.component';
const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'action/asset', component: AssetCreationComponent},
    {path: 'action/marketplace', component:MarketPlaceComponent},
    {path: 'action/insurer', component: InsurerCreationComponent},
    {path: 'register/owner', component: OwnerRegisterComponent},
    { path: '**',  component: HomeComponent  }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
