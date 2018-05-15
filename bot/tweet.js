const fs = require('fs');
const Twit = require('twit')

const config = require('./config.js');

// REFERENCES

module.exports = {
	generateTweet: generateTweet
};

function generateTweet(tweet_enabled, image_path) {
    let T = new Twit({
        consumer_key:         config['twitter_consumer_key'],
        consumer_secret:      config['twitter_consumer_secret'],
        access_token:         config['twitter_access_token'],
        access_token_secret:  config['twitter_access_token_secret'],
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    });
    prepareTweet(tweet_enabled, T, image_path);
}

function prepareTweet(tweet_enabled, T, image_path){
    let msg = '';
    if(!tweet_enabled){
        console.log('Tweets: Disabled!');
        return;
    }else{
        console.log('Tweets: Enabled!');
    }

    ////////////////////////////
    /* FS CONVERT SAVED FILE TO B64 */
    fs.readFile(image_path, { encoding: 'base64' }, (err, data) => {
        if (err) throw err;
        var b64content = data;
        sendTweet(T, b64content, 'Bot');
    });
}

function sendTweet(T, b64content, msg_alt){
     /////////////////////////////
    /* Tweet! */
    // first we must post the media to Twitter
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;
        var altText = msg_alt;
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
      
        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: '', media_ids: [mediaIdStr] }
        
            T.post('statuses/update', params, function (err, data, response) {
                console.log(data)
            })
            }else{
                console.log(err)
            }
        })
    })
}

