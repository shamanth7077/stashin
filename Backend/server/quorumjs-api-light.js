// const Nedb = require('nedb');
// const nedb = new Nedb({filename: 'contracts.db', autoload:true});
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger('quorum-api');


function quorum(){

  let self = {};

  self.test = function(){
    return 'test'
  };

  function get_voting_account(caller){
    /**
     * @param { Object } caller - object representing a connection to a node
     * @param { string } cName - programmatic name of the contract to deploy
     * @param { Array } args - array of arguments to pass in the constructor
     */
    const keys = caller.eth.accounts;
    if (keys.length > 1){
      for (let key of keys){
        if(caller.quorum.isVoter(key)){
          return key;
        }
      }
    }
    else{
      return keys[0];
    }
  }

  // SMART CONTRACT INTERACTION

  self.deploy_sol = function(caller, cName, args = []){
    /**
     * @param { Object } caller - object representing a connection to a node
     * @param { string } cName - programmatic name of the contract to deploy
     * @param { Array } args - array of arguments to pass in the constructor
     */
    var contractMeta = fs.readFileSync('contracts/contracts.json');
    var contractMeta = JSON.parse(contractMeta)[cName];
    const name = contractMeta.name;
    const version = contractMeta.version;
    const argc = parseInt(contractMeta.argc);
    if (args.length != argc){
        logger.error('Bad number of args provided, should be',
                    argc, 'but provided', args.length);
        return false;
    }
    const contractSource = fs.readFileSync('contracts/'+ name + '.sol').toString();
    const contractObject = caller.eth.compile.solidity(contractSource);
    const jsonMainKey = Object.keys(contractObject)[0];
    const bin = contractObject[jsonMainKey]['code'];
    const abi = contractObject[jsonMainKey]['info']['abiDefinition'];

    const contractFactory = caller.eth.contract(abi);
    return new Promise((resolve, reject) => {
      contractFactory.new(
        ...args,
        {
          from: caller.eth.accounts[0],
          data: bin.toString(),
          gas: caller.toHex(30000000),
          gasPrice: caller.toHex(10000)
        },
        function(err, res){
          if (err) {
            logger.info(err);
            reject(err);
          } else {
            if (!res.address) {
              logger.info("Contract transaction sent");
              logger.info("TransactionHash: " + res.transactionHash);
              logger.info("Waiting to be mined...");
            } else {
              logger.info("Contract mined!");
              logger.info("Address: " + res.address);
              resolve({abi: abi, address: res.address});
            }
          }
        }
      );
    })
  };

  self.contract_get = function(caller, abi, address, func, args = []){
      /**
     *  @param { Array } abi - Abi of the contract
     *  @param { string } address - Address of the contract
     *  @param { string } func - Function of the contract to call
     *  @param { number } args - Array of arguments (optional)
     *  @returns { Array<...[Object]> } returns getter's function return
     */
    const contract = caller.eth.contract(abi).at(address);
    return contract[func].call(...args, {from: caller.eth.accounts[0]});
  };

  self.contract_set = function(caller, abi, address, func, args = []){
    /**
     *  @param { Array } abi - Abi of the contract
     *  @param { string } address - Address of the contract
     *  @param { string } func - Function of the contract to call
     *  @param { number } payable - Bigger than 0 if function is payable
     *  @param { number } args - Array of arguments (optional)
     *  @returns { Array<Object> } returns tx receipt. No way to get the real return
     */
    const contract = caller.eth.contract(abi).at(address);
    return new Promise(function (resolve, reject) {
      contract[func](...args, {
        from: caller.eth.accounts[0],
        gas: caller.toHex(30000000),
        gasPrice: caller.toHex(10000)
      },
      function (err, res) {
        let filter = caller.eth.filter('latest');
        filter.watch(function (err2, res2) {
          let temp = caller.eth.getTransactionReceipt(res);
          if (err2){
            reject(['Contract Rejected', err]);
          }
          if (temp !== null) {
            filter.stopWatching();
            resolve(['Contract Updated', temp]);
          }
        });
      });
    });
  };

  return self;
};

exports.quorum = quorum;
