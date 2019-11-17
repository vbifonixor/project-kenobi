const fse = require("fs-extra");

const { DATA_BANK_PATH } = require('./constants');

module.exports = {
    readBank(namespace) {
        return (fse.readJSONSync(DATA_BANK_PATH) || {})[namespace];
    },
    writeBank(namespace, newData) {
        const oldData = fse.readJSONSync(DATA_BANK_PATH) || {};
        return fse.outputJSONSync(DATA_BANK_PATH, { ...oldData, [namespace]: newData });
    }
}
