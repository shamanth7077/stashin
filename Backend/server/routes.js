
const express = require('express');
const router  = express.Router();
const log4js  = require('log4js');
var splitratio;
const logger = log4js.getLogger('routes');
const user   = require('./user');
const Web3Q  = require('./web3q-essentials.js'); // we import the web3q-essentials, that allows to talk with the blockchain at low level (normally we have to import it in light api but we use it here for debugging)
const quorumApi   = require('./quorumjs-api-light').quorum();  // light api, which normally imports low level web3q
const coafMethods = require('./coaf');
const Nedb = require('nedb');
const nedb = new Nedb({filename: './DB/ledger.db', autoload:true});
const net = require('net'); // used if you want to do an ipc connection to blockchain. REMEMBER ! ipc connections are ASYNC
// let issuerNode = Web3Q.extend.RPC("http://localhost:22000/"); // this is how you connect to the blockchain through RPC
// let issuerNode = Web3Q.extendIPC('patht to geth.ipc', net) // this is how you connect ot the blockchain through IPC

function sendError(res, func, err) {
    logger.error(`Error in '${func}'`);
    logger.error(err);
    res.send(err);
    res.end();
}
router.post('/:issuer/deploy_sol', (req, res) => {
    /**
     * @param { number } req.body.issuer - issuer id
     * @param { string } req.body.contractName - abi of the contract
     * @param { string } req.body.coaf - coaf reference of the contract
     * @param { Array<String> } req.body.args - array of arguments to be passed in the constructor
     */
    const issuer = req.params.issuer;
    const coaf = req.body.coaf;
    const name=req.body.name;
    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(issuer)}/`); // creating an rpc connection with the node
    const issuerAddress = issuerNode.eth.accounts[0];
    user.save('issuer', issuerAddress)
        .then(() => {
            const args =[];
            logger.info(`Deploying contract with contract reference number ${coaf}`);
            logger.info(issuerNode)
            quorumApi.deploy_sol(issuerNode, name, args)
                .then((contract) => {
                    logger.info("success");
                    coafMethods.save_coaf(coaf, contract.abi, contract.address);
                    res.send(contract);
                    res.end();
                })
                .catch((err) => {
                    res.status(500).send(err)
                });
        })
        .catch(err => sendError(res, 'deploy-sol', err));
});
router.post('/:owner/create_owner', (req, res) => {
    const owner = req.params.owner;
    const ownerName = req.body.name.toLowerCase();
    const status = req.body.status;
    const age=req.body.age;
    const address=req.body.address;
    const SSN =req.body.SSN;
    const coaf     = req.body.coaf;
    const ownerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(owner)}/`); // creating an rpc connection with the node
    const ownerAddress = ownerNode.eth.accounts[0];
    logger.info(`Allowing owner${ownerName} @${ownerAddress} for coaf ${coaf}`);

    coafMethods.get_coaf_mapping(coaf)
        .then(contract => {
            const func = 'createowner';
            const args = [
                ownerAddress,
                status,
                SSN,
                ownerName,
                req.body.contactnumber,
                age,
                address
            ];
            const data = {
                coaf: coaf,
                ownername:ownerName,
                ownerAddress:ownerAddress,
                type:"addition of owner"

            };
            nedb.insert(data, (err, res) => {
                if (err) {
                    logger.error('Error inserting date into DB');

                }
                if (res) {
                    logger.info('inserted into  DB');

                }
            });
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(ownerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("create owner successful");
                    user.save(ownerName, ownerAddress)
                        .then(() => {
                            res.send(JSON.stringify({
                                message: _res[0],
                                data: _res[1]
                            }));
                            res.end();
                        })
                        .catch((err) => {
                            sendError(res, func, err);
                        });
                })
                .catch((err) => {
                    sendError(res, 'allow_owner', err);
                })
        })
});
router.post('/:owner/add_asset', (req, res) => {
    const owner = req.params.owner;
    var func     = 'addassetautomobile';
    const coaf     = req.body.coaf;

    const ownerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(owner)}/`); // creating an rpc connection with the node
    const ownerAddress = ownerNode.eth.accounts[0];
    const data = {
        coaf: coaf,
        ownerAddress:ownerAddress,
        type:"addition of asset",
        typeofasset:req.body.category
    };

    nedb.insert(data, (err, res) => {
        if (err) {
            logger.error('Error inserting date into DB');

        }
        if (res) {
            logger.info('inserted into  DB');

        }
    });
    logger.info(`Allowing owner through owner node ${owner}`);
    logger.info(`${coaf}`)
    const houseno=req.body.houseno;
    // Only execute contract functions when fetching of the parameters is complete
    if(req.body.category=='Automobile'){
    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                ownerAddress,
                req.body.category,
                req.body.value,
                req.body.availableforsale,
                req.body.automobilemark,
                req.body.automobilemodel,
                req.body.enginesize,
                req.body.amlicenceplate
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(ownerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("successfully added asset");
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
        })
        .catch((err) =>{
            logger.error(err);
            res.status(500).send(err)
        });
      }
      else {
        func="addassethouse"
        coafMethods.get_coaf_mapping(coaf)
            .then((contract) => {
                const args = [
                    ownerAddress,
                    req.body.category,
                    req.body.value,
                    req.body.availableforsale,
                    req.body.houseno,
                    req.body.street,
                    req.body.postalcode,
                ];
                logger.info(`Using args: ${args}`);
                quorumApi.contract_set(ownerNode, contract[0].abi, contract[0].address, func, args)
                    .then((_res) => {
                        logger.info("successfully added asset");
                        res.send(JSON.stringify({
                            message: _res[0],
                            data: _res[1]
                        }));
                        res.end();
                    })
            })
            .catch((err) =>{
                logger.error(err);
                res.status(500).send(err)
            });
          }


});

router.post('/:insurer/:coaf/add_insurer', (req, res) => {
    const insurer = req.params.insurer;
    logger.info(insurer);
    const insurerName = req.body.name.toLowerCase();
    const ampolicy=req.body.ampolicy;
    const housepolicy=req.body.housepolicy;
    const coaf     = req.params.coaf;
    const insurerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(insurer)}/`); // creating an rpc connection with the node
    logger.info(`${insurerNode.eth.accounts}`);
    const insurerAddress = insurerNode.eth.accounts[0];
    logger.info(`Allowing insurer${insurerName} @${insurerAddress} for coaf ${coaf}`);
    const data = {
        coaf: coaf,
        insurerAddress:insurerAddress,
        type:"addition of insurer",
        Insurername:insurerName
    };
    nedb.insert(data, (err, res) => {
        if (err) {
            logger.error('Error inserting date into DB');

        }
        if (res) {
            logger.info('inserted into  DB');

        }
    });

    coafMethods.get_coaf_mapping(coaf)
        .then(contract => {
            const func = 'addinsurer';
            const args = [
                insurerAddress,
                insurerName,
                ampolicy,
                housepolicy,
                req.body.automobilepremieum,
                req.body.housepremieum
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(insurerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("create insurer successful");
                    user.save(insurerName, insurerAddress)
                        .then(() => {
                            res.send(JSON.stringify({
                                message: _res[0],
                                data: _res[1]
                            }));
                            res.end();
                        })
                        .catch((err) => {
                            sendError(res, func, err);
                        });
                })
                .catch((err) => {
                    sendError(res, 'allow_insurer', err);
                })
        })
});
router.post('/:insurer/:owner/:coaf/insure_asset', (req, res) => {
    var insurer = req.params.insurer-5;
    console.log("insurer"+insurer);
    const owner =req.params.owner;

    const insurerName = req.body.name.toLowerCase();
    const coaf=req.params.coaf
    const id =req.body.id;
    const ownerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(owner)}/`);
    const ownerAddress = ownerNode.eth.accounts[0];
    logger.info("ownerAddress:"+ownerAddress);
    logger.info("id:"+id);
    const insurerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(insurer)}/`); // creating an rpc connection with the node
    const insurerAddress = insurerNode.eth.accounts[0];
    logger.info(`insuring asset with insurer${insurerName} @${insurerAddress} for coaf ${coaf}`);
    const data = {
        coaf: coaf,
        insurerAddress:insurerAddress,
        owneraddress:ownerAddress,
        type:"insuring asset",
        Insurername:insurerName,
        idofasset:id
    };
    nedb.insert(data, (err, res) => {
        if (err) {
            logger.error('Error inserting date into DB');

        }
        if (res) {
            logger.info('inserted into  DB');

        }
    });
    coafMethods.get_coaf_mapping(coaf)
        .then(contract => {
            const func = 'insureasset';
            const args = [
                insurerAddress,
                ownerAddress,
                insurerName,
                id
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(insurerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("successfully insured asset");
                    user.save(insurerName, insurerAddress)
                        .then(() => {
                            res.send(JSON.stringify({
                                message: _res[0],
                                data: _res[1]
                            }));
                            res.end();
                        })
                        .catch((err) => {
                            sendError(res, func, err);
                        });
                })
                .catch((err) => {
                    sendError(res, 'allow_insurer', err);
                })
        })
});
router.get('/:owner/:coaf/get_owner', (req, res) => {
    const func   = 'getOwner';
    const owner = req.params.owner;
    const coaf   = req.params.coaf;

    const ownerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(owner)}/`); // creating an rpc connection with the node
    const ownerAddress = ownerNode.eth.coinbase;

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                ownerAddress
            ];
            logger.info(`Calling get_Owner with args: ${args}`);
            const result   = quorumApi.contract_get(ownerNode, contract[0].abi, contract[0].address, func, args);
            console.log(result);
            const resultObj = {
                address:result[6],
                age:result[5],
                contactnumber: result[4],
                name:             result[3],
                SSN:  result[2],
                status: result[1],
                numberOfAssets:   result[0]
            };
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
router.get('/:owner/:coaf/get_insurer', (req, res) => {
    const func   = 'getInsurer';
    const owner = req.params.owner;
    const coaf   = req.params.coaf;
    logger.info("coaf:"+coaf);
    const ownerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(owner)}/`); // creating an rpc connection with the node
    const ownerAddress = ownerNode.eth.coinbase;

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                ownerAddress
            ];
            logger.info(`Calling get_Insurer with args: ${args}`);
            const result   = quorumApi.contract_get(ownerNode, contract[0].abi, contract[0].address, func, args);
            console.log(result);
            const resultObj = {
                housepremieum:result[5],
                automobilepremieum:result[4],
                name:             result[3],
                housepolicy:  result[1],
                ampolicy: result[2],
                numberOfClients:   result[0],
            };
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
router.get('/:owner/:coaf/:id/get_assetinfo', (req, res) => {
    const func   = 'displayassetdetails';
    const id=req.params.id;
    const owner = req.params.owner;
    const coaf   = req.params.coaf;
    logger.info("coaf:"+coaf);
    const ownerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(owner)}/`); // creating an rpc connection with the node
    const ownerAddress = ownerNode.eth.coinbase;

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                ownerAddress,
                id
            ];
            logger.info(`Calling get_asset info with args: ${args}`);
            const result   = quorumApi.contract_get(ownerNode, contract[0].abi, contract[0].address, func, args);
            const automobileinfo = quorumApi.contract_get(ownerNode, contract[0].abi, contract[0].address, 'getautomobileinfo',args);
            const houseinfo = quorumApi.contract_get(ownerNode, contract[0].abi, contract[0].address, 'gethouseinfo',args);
            console.log(result);
            const resultObj = {
              category:result[0],
              amlicenceplate:automobileinfo[0],
              automobilemark:automobileinfo[1],
              automobilemodel:automobileinfo[2],
              enginesize:automobileinfo[3],
              houseno:houseinfo[0],
              street:houseinfo[1],
              postalcode:houseinfo[2]
            };
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
router.get('/:caller/:coaf/get_number_of_providers', (req, res) => {
    const func   = 'getnumberofowners';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [];
            logger.info(`Calling get_owners with args: ${args}`);
            const len = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, 'getnumberofowners', []);
            res.send({length: len});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
router.get('/:provider/:coaf/get_assetsforsale', (req, res) => {
    const provider = req.params.provider;
    const coaf     = req.params.coaf;
  const func ="getnumberofassetsforsale";
    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.coinbase;

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [];
            logger.info(`Calling _assetsforsale with args: ${args}`);
            const len = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'getnumberofassetsforsale');

            const shareholders = [];
            for (let i = 0; i < len; i++) {
                const shareholder = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address,'getAssetForSaleById',[i]);
                const automobileinfo = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address,'getAssetForSaleByIda',[i]);
                const houseinfo = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address,'getAssetForSaleByIdh',[i]);

                console.log(shareholder);
                const shareholderObj = {
                    id : i,
                    ownername: shareholder[0],
                    contactnumber:shareholder[1],
                    category:           shareholder[2],
                    value:         shareholder[3],
                    automobilemark:automobileinfo[0],
                    automobilemodel:automobileinfo[1],
                    licenceplate:automobileinfo[2],
                    enginesize:automobileinfo[3],
                    houseno:houseinfo[0],
                    street:houseinfo[1],
                    postalcode:houseinfo[2]

                };
                shareholders.push(shareholderObj);
            }
            res.send({assets: shareholders});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
router.get('/:provider/:coaf/get_assets', (req, res) => {
    const provider = req.params.provider;
    const coaf     = req.params.coaf;
    const func ="getnumberofassets";
    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.coinbase;

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [];
            logger.info(`Calling get_assets with args: ${args}`);
            const len = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'getnumberofassets', [providerAddress]);
            logger.info(providerAddress);
            logger.info(len);
            const shareholders = [];
            for (let i = 0; i < len; i++) {
                const shareholder = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'displayassetdetails', [providerAddress, i]);


                console.log(shareholder);
                const shareholderObj = {
                    id : i,
                    category:           shareholder[0],
                    insurername:    shareholder[1],

                    availableforsale: shareholder[2],
                    insured:          shareholder[3],
                    value:         shareholder[4]

                };
                shareholders.push(shareholderObj);
            }
            res.send({assets: shareholders});
            res.end();
        })
        .catch((err) =>{
            logger.error(err);
            res.status(500).send(err)
        });
});
router.get('/:caller/:coaf/get_providers', (req, res) => {
    const func   = 'getNumberOfInsurers';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {

            const args = [];
            logger.info(`Calling get_insurers with args: ${args}`);
            const len = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, 'getNumberOfInsurers', []);
            const providers = [];
            for (let i = 0; i < len; i++) {
                const provider = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, 'getInsurerById', [i]);
                const providerObj = {
                    NodeId:           i+5,
                    name:             provider[0],
                    automobilepolicy:  provider[1],
                    housepolicy: provider[2],
                    automobilepremieum:           provider[3],
                    housepremieum:   provider[4],
                };
                providers.push(providerObj);
            }
            res.send({providers: providers});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
router.post('/:seller/:buyer/:coaf/record_sale', (req, res) => {
    const seller = req.params.seller;
    const buyer =req.params.buyer;
    const coaf=req.params.coaf
    const assetid =req.body.assetid;
    const assetforsaleid=req.body.assetforsaleid;
    const sellerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(seller)}/`);
    const sellerAddress = sellerNode.eth.accounts[0];
    const buyerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(buyer)}/`); // creating an rpc connection with the node
    const buyerAddress = buyerNode.eth.accounts[0];
    logger.info(`selling asset`);
    const data = {
        coaf: coaf,
        buyeraddress:buyerAddress,
        selleraddress:sellerAddress,
        id:"selling asset",
    };
    nedb.insert(data, (err, res) => {
        if (err) {
            logger.error('Error inserting date into DB');

        }
        if (res) {
            logger.info('inserted into  DB');

        }
    });
    coafMethods.get_coaf_mapping(coaf)
        .then(contract => {
            const func = 'recordtransacctionofasset';
            const args = [
                sellerAddress,
                 buyerAddress,
                assetid,
                assetforsaleid
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(buyerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("successfully sold asset");
                    user.save(sellerAddress, buyerAddress)
                        .then(() => {
                            res.send(JSON.stringify({
                                message: _res[0],
                                data: _res[1]
                            }));
                            res.end();
                        })
                        .catch((err) => {
                            sendError(res, func, err);
                        });
                })
                .catch((err) => {
                    sendError(res, 'allow_insurer', err);
                })
        })
});
module.exports = router;
/*
function getAssetForSaleById(uint _id) constant returns (string name,uint contactnumber, string category, uint value) {
  uint len = getnumberofassetsforsale();
  if (_id >= len) {
    throw;
  }

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

  return (
  assetsforsale[_id].asset.houseno,
  assetsforsale[_id].asset.street,
  assetsforsale[_id].asset.postalcode
 );
}
*/

/*
   function recordtransacctionofasset(address _seller,address _buyer,uint assetid,uint assetforsaleid){
     owner seller =providerOf[_seller];
     owner buyer =providerOf[_buyer];
     buyer.asset[buyer.noofassets]=seller.asset[assetid];


     delete(seller.asset[assetid]);
     seller.asset[assetid]=seller.asset[seller.noofassets];
     delete(seller.asset[seller.noofassets]);
     delete(assetsforsale[assetforsaleid]);
     assetsforsale[assetforsaleid]=assetsforsale[numberofassetsforsale];
     delete(assetsforsale[numberofassetsforsale]);
   }
*/
