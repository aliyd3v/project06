const saltedMd5 = require('salted-md5')

exports.salting = (data) => {
    return saltedMd5(data, 'h3LL0')
}