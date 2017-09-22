/**
 * Created by joerijackers on 02/07/2017.
 */

// *** COAF REF mapping database ***
const Nedb = require('nedb');
const nedb = new Nedb({filename: './DB/users.db', autoload:true});
const log4js = require('log4js');
const logger = log4js.getLogger('userDB');


module.exports = {

    save: (name, address) => {
        /**
         * @param { Object } _coaf - COAF reference, mapped to abi and address
         * @param { Array } _abi - abi of the contract
         * @param { string } _address - address of the contract
         */
        return new Promise((resolve, reject) => {
            const data = {
                name: name.toLowerCase(),
                address: address,
                date: new Date()
            };
            nedb.insert(data, (err, res) => {
                if (err) {
                    logger.error('Error saving user to DB');
                    reject(err);
                }
                if (res) {
                    logger.info('Successfully inserted user into DB');
                    resolve(res);
                }
            });
        });
    },

    get: (name) => {
        /**
         * @param { string } _coaf - COAF reference, mapped to abi and address
         */
        return new Promise((resolve, reject) => {
            nedb.findOne({name: name.toLowerCase()}).sort({date: -1}).exec((err, res) => {
                if (err || res.length === 0) {
                    logger.error('Error finding user in DB');
                    reject(err);
                }
                if (res) {
                    logger.info('Retrieved user from DB');
                    resolve(res);
                }
            });
        });
    }
};
