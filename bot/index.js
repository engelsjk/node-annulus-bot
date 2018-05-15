const run = require('./run.js')

///

let w = 2000, h = 2000;
let image_path = '/tmp/image.png'; // /tmp/image.png
let tweet_enabled = true;
let limits = {'ai':15,'aj':15,'ri':30,'rj':30,'cf':10,'ng':10};

//

//run.generateArt()

exports.handler = function(event, context, callback) {
    run.generateArt(w,h,image_path,tweet_enabled,limits)
}
