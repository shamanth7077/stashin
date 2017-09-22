/**
 * Created by joerijackers on 07/07/2017.
 */

import { Owner } from '../models/owner.class';
import { Asset } from '../models/asset.class';
import { Insurer } from '../models/insurer.class';

export class MockOwner {
    static own = new Owner('',null,null,null, '', '',null,'');
}
export class MockInsurer {
    static ins = new Insurer('', '', '', '',null,0,0);
}


export class MockAsset{
    static ass = new Asset(MockOwner.own, null,'', null,'','',null,'',0,0,'',0,false,false,'','');
}
