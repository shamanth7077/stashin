

/*

STASHIN

entry : deploy STASHIN
owner - 2 nodes
insurer - 1 node
*/


pragma solidity ^0.4.7;

contract stashin{
    mapping(address=>owner) providerOf;
    mapping(address=>insurer) insurerOf;
    uint numberofowners;
    uint numberofinsurers;
    uint numberofassetsforsale;
    uint factor=0;
    struct owner{
     uint noofassets; // no of assets he/she has on the blockchain

     string _status; // whether he is affiliated with any company or is independant
     uint SSN; // security number
     string ownername;
     mapping(uint => assetmodule) asset;
     uint contactnumber;
     uint age;
     string _address;
    }
    owner[] owners;
    struct assetmodule{
        string category;
        string insurername;
        bool availableforsale;
        bool insured;
        uint value;
        uint houseno;
        string street;
        uint postalcode;
        string automobilemark;
        string automobilemodel;
        uint licenceplate;
        uint enginesize;

    }
    struct assetsalemodule{
      assetmodule asset;
      owner ownerofasset;

    }
    assetsalemodule[] assetsforsale;
    struct insurer{
        string insurername;
        uint noofclients;
        string automobileinsurancepolicy;
        string houseinsurancepolicy;
        uint premiumautomobile;
        uint premiumhouse;
        mapping (uint =>owner) own;

    }
    insurer[] insurers;

    function stashin(){

    }

      function createowner(address _owner,string _status,uint _SSN,string ownername,uint contactnumber,uint age,string _address) returns (string)
    {

        uint len = owners.push(owner(0,_status,_SSN,ownername,contactnumber,age,_address))-1;
        providerOf[_owner]=owners[len];
        numberofowners+=1;
        return "owner created";
    }
     function addassetautomobile(address _owner,string category,uint value,bool availableforsale,string automobilemark,string automobilemodel,uint enginesize,uint licenceplate) returns (string)
    {
        owner ow = providerOf[_owner];
        ow.asset[ow.noofassets]= assetmodule(category," no insurer assigned",availableforsale,false,value,0,'N/a',0,automobilemark,automobilemodel,licenceplate,enginesize);

        ow.noofassets+=1;

         if(availableforsale==true){
             assetmodule asset1=ow.asset[ow.noofassets-1];
            assetsforsale.push(assetsalemodule(asset1,ow));
            numberofassetsforsale+=1;
          }
      }
      function addassethouse(address _owner,string category,uint value,bool availableforsale,uint houseno,string street,uint postalcode) returns (string)
     {
         owner ow = providerOf[_owner];
         ow.asset[ow.noofassets]= assetmodule(category," no insurer assigned",availableforsale,false,value,houseno,street,postalcode,'','',0,0);

         ow.noofassets+=1;

         if(availableforsale==true){

            assetmodule asset1= ow.asset[ow.noofassets-1];
            assetsforsale.push(assetsalemodule(asset1,ow));
            numberofassetsforsale+=1;
          }
       }
    function addinsurer(address _insurer,string name,string automobilepolicy,string housepolicy,uint automobilepremium,uint housepremium){
        uint len = insurers.push(insurer(name,0,automobilepolicy,housepolicy,automobilepremium,housepremium))-1;
        insurerOf[_insurer]= insurers[len];
        numberofinsurers+=1;
    }


    function insureasset(address _insurer,address _owner,string insurername,uint assetid){

        insurer ins = insurerOf[_insurer];
        owner   ow = providerOf[_owner];

        ow.asset[assetid].insurername=insurername;
        ow.asset[assetid].insured=true;

        ins.own[ins.noofclients]=ow;
        ins.noofclients+=1;
        insurerOf[_insurer]=ins;

    }
    function showautomobilepremiuminfo(address _insurer)returns (string,uint){
        return(insurerOf[_insurer].automobileinsurancepolicy,insurerOf[_insurer].premiumautomobile);

    }
    function getNumberOfInsurers() constant returns (uint length) {
      return numberofinsurers;
    }
    function showhousepremiuminfo(address _insurer)returns (string,uint){
        return(insurerOf[_insurer].houseinsurancepolicy,insurerOf[_insurer].premiumhouse);

    }
    function displayassetdetails(address _owner,uint assetid)returns (string,string,bool,bool,uint){
      assetmodule asset = providerOf[_owner].asset[assetid];
      return (asset.category,asset.insurername,asset.availableforsale,asset.insured,asset.value);
     }
     function gethouseinfo(address _owner,uint assetid)returns (uint,string,uint){
       assetmodule asset = providerOf[_owner].asset[assetid];
       return (asset.houseno,asset.street,asset.postalcode);
      }
      function getautomobileinfo(address _owner,uint assetid)returns (uint,string,string,uint enginesize){
        assetmodule asset = providerOf[_owner].asset[assetid];
        return (asset.licenceplate,asset.automobilemark,asset.automobilemodel,asset.enginesize);
       }

     function getOwner(address _owner) constant returns (uint noofassets,string status,uint SSN,string ownername,uint contactnumber,uint age,string _address)
   {
     return (providerOf[_owner].noofassets,providerOf[_owner]._status,providerOf[_owner].SSN,providerOf[_owner].ownername,providerOf[_owner].contactnumber,providerOf[_owner].age,providerOf[_owner]._address);
   }
   function getnumberofowners() constant returns (uint length){
     return numberofowners;
   }

   function getnumberofassetsforsale() constant returns (uint length){
     return numberofassetsforsale;
   }
   function getnumberofassets(address _owner) constant returns (uint number){
     return providerOf[_owner].noofassets;
   }
   function getInsurer(address _insurer) constant returns (uint noofclients,string housepolicy,string ampolicy,string insurername,uint automobilepremium,uint housepremium)
 {
   return (insurerOf[_insurer].noofclients,insurerOf[_insurer].houseinsurancepolicy,insurerOf[_insurer].automobileinsurancepolicy,insurerOf[_insurer].insurername,insurerOf[_insurer].premiumautomobile,insurerOf[_insurer].premiumhouse);
 }
 function getInsurerById(uint _id) constant returns (string name, string ampolicy, string housepolicy,uint ampremium,uint housepremium ) {
   uint len = getNumberOfInsurers();
   if (_id >= len) {
     throw;
   }
   return (insurers[_id].insurername,
   insurers[_id].automobileinsurancepolicy,
   insurers[_id].houseinsurancepolicy,
   insurers[_id].premiumautomobile,
   insurers[_id].premiumhouse);
 }

 function getAssetForSaleById(uint _id) constant returns (string name,uint contactnumber, string category, uint value) {
   uint len = getnumberofassetsforsale();
   if (_id >= len) {
     throw;
   }
   _id=_id+factor;
   return (assetsforsale[_id].ownerofasset.ownername,
   assetsforsale[_id].ownerofasset.contactnumber,
   assetsforsale[_id].asset.category,
   assetsforsale[_id].asset.value
  );
 }
 function getAssetForSaleByIda(uint _id) constant returns (string automobilemark,string automobilemodel,uint licenceplate,uint enginesize ) {
   uint len = getnumberofassetsforsale();
   if (_id >= len) {
     throw;
   }
    _id=_id+factor;
   return (
   assetsforsale[_id].asset.automobilemark,
   assetsforsale[_id].asset.automobilemodel,
   assetsforsale[_id].asset.licenceplate,
   assetsforsale[_id].asset.enginesize);
 }
 function getAssetForSaleByIdh(uint _id) constant returns (uint houseno,string street,uint postalcode ) {
   uint len = getnumberofassetsforsale();
   if (_id >= len) {
     throw;
   }
    _id=_id+factor;
   return (
   assetsforsale[_id].asset.houseno,
   assetsforsale[_id].asset.street,
   assetsforsale[_id].asset.postalcode
  );
 }



    function recordtransacctionofasset(address _seller,address _buyer,uint assetid,uint assetforsaleid){
      owner seller =providerOf[_seller];
      owner buyer =providerOf[_buyer];
      assetmodule asset1=providerOf[_seller].asset[assetid];
      providerOf[_buyer].asset[providerOf[_buyer].noofassets]=asset1;
      providerOf[_buyer].noofassets+=1;

      delete(providerOf[_seller].asset[assetid]);
      assetmodule asset2=  providerOf[_seller].asset[(providerOf[_seller].noofassets)-1];
      providerOf[_seller].asset[assetid]=asset2;
      providerOf[_seller].noofassets-=1;
      delete(assetsforsale[assetforsaleid]);
      numberofassetsforsale-=1;
      factor+=1;


    }


}
