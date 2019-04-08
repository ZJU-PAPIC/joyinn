const uuidv1 = require('uuid/v1');

const uniqueStr = (len, prefix = "", postfix = "") => {};

const uniqueUid = () => {
    return uuidv1();
}

module.exports = {
  uniqueStr,
  uniqueUid
};
