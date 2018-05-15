const window        = require('svgdom')
const SVG           = require('svg.js')(window)
const svg2png       = require("svg2png");
const fs            = require('fs');

const art        = require('./art.js')
const tweet         = require('./tweet.js');

//

module.exports = {
    generateArt: generateArt
}

//

function getRandomNumeric(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function cbWriteFile(tweet_enabled,image_path){
    return function() {
        tweet.generateTweet (tweet_enabled, image_path);
    }
}

function generateArt(w,h,image_path,tweet_enabled,limits){

    const document = window.document
    const draw = SVG(document.documentElement)

    draw.rect(w,h).attr({ fill: '#000' })

    let ai = getRandomNumeric(0, limits['ai']);
    let aj = getRandomNumeric(0, limits['aj']);
    let ri = getRandomNumeric(0, limits['ri']);
    let rj = getRandomNumeric(0, limits['rj']);
    let cf = getRandomNumeric(1, limits['cf']);
    let ng = getRandomIntInclusive(1, limits['ng']);
    let rc = getRandomIntInclusive(0, 1);
    let ms = getRandomIntInclusive(0, 1);

    let opts = {
        'ai': ai,
        'aj': aj, 
        'ri': ri,
        'rj': rj,
        'cf': cf,
        'ng': ng,
        'rc': rc,
        'ms': ms
    };
    console.log(opts);
    
    let newart = new art.Art(draw,[w,h],opts);
    newart.draw();

    const buffer = svg2png.sync(draw.svg(), { width: w, height: h });
    fs.writeFile(image_path, buffer, cbWriteFile(tweet_enabled,image_path))
}

