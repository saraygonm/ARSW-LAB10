const memorize = {};
var bigInt = require("big-integer");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth;

    function helper(n) {
        if (n in memorize) return memorize[n];
        if (n < 3) return bigInt.one;
        return memorize[n] = helper(n - 1).add(helper(n - 2));
    }

    context.res = {
        body: helper(nth).toString()
    };
}
