/**
 * Created by joerijackers on 02/07/2017.
 */

// *** COAF REF mapping database ***
const Nedb = require('nedb');
const nedb = new Nedb({filename: './DB/coaf3.db', autoload:true});
const log4js = require('log4js');
const logger = log4js.getLogger('coafDB');


module.exports = {

     save_coaf: (_coaf, _abi, _address) => {
        /**
         * @param { Object } _coaf - COAF reference, mapped to abi and address
         * @param { Array } _abi - abi of the contract
         * @param { string } _address - address of the contract
         */
        return new Promise((resolve, reject) => {
            const data = {
                coaf: _coaf,
                address: _address,
                date: new Date(),
                abi: _abi
            };
            nedb.insert(data, (err, res) => {
                if (err) {
                    logger.error('Error inserting contract from DB');
                    reject(err);
                }
                if (res) {
                    logger.info('Inserted contract from DB');
                    resolve(res);
                }
            });
        });
    },

    get_coaf_mapping: (_coaf) => {
        /**
         * @param { string } _coaf - COAF reference, mapped to abi and address
         */
        return new Promise((resolve, reject) => {
            nedb.find({coaf: _coaf}).sort({date: -1}).exec((err, res) => {
                if (err || res.length === 0) {
                    logger.error('Error retrieving contract from DB');
                    reject(err);
                }
                if (res) {
                    logger.info('Retrieved contract from DB');
                    resolve(res);
                }
            });
        });
    }
};
