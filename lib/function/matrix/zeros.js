module.exports = function (math, settings) {
  var util = require('../../util/index'),

      BigNumber = require('bignumber.js'),
      Matrix = require('../../type/Matrix'),
      collection = require('../../type/collection'),

      array = util.array,
      toNumber = util.number.toNumber,
      isArray = Array.isArray;

  /**
   * create a matrix filled with zeros
   *
   *     zeros(m)
   *     zeros(m, n)
   *     zeros([m, n])
   *     zeros([m, n, p, ...])
   *
   * @param {...Number | Array} size
   * @return {Array | Matrix | Number} matrix
   */
  math.zeros = function zeros (size) {
    var args = collection.argsToArray(arguments);
    var asMatrix = (size instanceof Matrix) ? true :
        (isArray(size) ? false : (settings.matrix === 'matrix'));

    if (args.length == 0) {
      // output an empty matrix
      return asMatrix ? new Matrix() : [];
    }
    else {
      // output an array or matrix
      var res = [];
      var defaultValue = (args[0] instanceof BigNumber) ? new BigNumber(0) : 0;
      res = array.resize(res, args.map(toNumber), defaultValue);

      return asMatrix ? new Matrix(res) : res;
    }
  };
};
