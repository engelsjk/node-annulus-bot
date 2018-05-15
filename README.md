# node-annulus-bot

![](images/twitter-header.png)

Meet [@AnnulusBot](https://twitter.com/annulusbot), my first attempt at a [#generativeart](https://twitter.com/hashtag/generativeart?lang=en) bot on Twitter!

# How Does It Work?
AnnulusBot generates sequences of [annulur segments](https://en.wikipedia.org/wiki/Annulus_(mathematics)), with random thicknesses and spacings of the radial and angulur components. It also uses the top 1000 color palletes from [Colour Lovers](http://www.colourlovers.com/) (provided in JSON format by the [Jam3/nice-color-palettes](https://github.com/Jam3/nice-color-palettes) repo). There are 8 settings that get randomized, either during the initial startup or during the sequenced, radial buildout of the annulur sectors.

Built with Node.js and deployed using AWS Lambda/CloudWatch, AnnulusBot is very similar to my other two Twitter bots, [BrokenArrowBot](https://github.com/engelsjk/node-broken-arrow-bot) and [CupolaBot](https://github.com/engelsjk/node-cupola-bot). 

# Any Issues?
While all three of these bots do image generation, the other two bots used the [Jimp](https://github.com/oliver-moran/jimp) Node.js library to do PNG manipulation. For the AnnulusBot, I decided to use SVG to make the annulur segment manipulations a little easier. 

But! I ran into a bit of a problem trying to export the SVG image to PNG. I used the [svg2png](https://github.com/domenic/svg2png) Node.js library, which uses "the latest in PhantomJS technology to render your SVGs using a headless WebKit instance." The only problem is that it didn't want to run in AWS Lambda! Long story short, I came across a roundabout solution that consisted of running <code>npm install</code> in a Docker/Linux instance using these [bash commands](https://gist.github.com/zeroasterisk/ad72b6737623d85be28f5ce23e755b90). This apparently builds a Linux version of PhantomJS in the Node.js project, which plays nice with Lambda. And it worked!
