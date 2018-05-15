// https://gist.github.com/buschtoens/4190516
// https://stackoverflow.com/questions/11479185/svg-donut-slice-as-path-element-annular-sector
// https://github.com/Jam3/nice-color-palettes

const palettes = require('./palettes-1000.json');

module.exports = {
    Art: Art
}

function Art(draw,wh,opts){

    var that = this;

    that.wh = wh;

    that.ai = opts.ai;
    that.aj = opts.aj;
    that.ri = opts.ri;
    that.rj = opts.rj;
    that.ng = opts.ng;
    that.cf = opts.cf;
    that.rc = opts.rc;
    that.ms = opts.ms;

    that.ps = [];
    that.p = [];

    this.draw = function(){
        that.p = getPalette();
        that.c = getCenter();
        let ii = 1;
        while(ii<=that.ng){
            generateArt();
            ii += 1;
        }
    }

    // UTILITIES

    function d2r(d) {
        return d * Math.PI / 180;
    }

    function r2d(r) {
        return r / Math.PI * 180;
    }

    function getRandomNumeric(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    // DRAWING

    function getPalette(){
        let l = palettes.length;
        let i = getRandomIntInclusive(0, l);
        let p = palettes[i];
        return p;
    }

    function getCenter(){
        let cx = 0, cy = 0;
        if(that.rc){
            cx = getRandomNumeric(0, that.wh[0]);
            cy = getRandomNumeric(0, that.wh[1]);
        }else{
            cx = that.wh[0]/2;
            cy = that.wh[1]/2;
        }
        return [cx,cy];
    }

    function getAnnularSector(opts){
        let p = [ // points
        [opts.cx + opts.r1*Math.cos(opts.a0),
        opts.cy + opts.r1*Math.sin(opts.a0)],
        [opts.cx + opts.r1*Math.cos(opts.a1),
        opts.cy + opts.r1*Math.sin(opts.a1)],
        [opts.cx + opts.r0*Math.cos(opts.a1),
        opts.cy + opts.r0*Math.sin(opts.a1)],
        [opts.cx + opts.r0*Math.cos(opts.a0),
        opts.cy + opts.r0*Math.sin(opts.a0)],
        ];

        let angleDiff = opts.a1 - opts.a0;
        let largeArc = (angleDiff % (Math.PI*2)) > Math.PI ? 1 : 0;
        let cmds = [];
        cmds.push("M"+p[0].join());                                // Move to P0
        cmds.push("A"+[opts.r1,opts.r1,0,largeArc,1,p[1]].join()); // Arc to  P1
        cmds.push("L"+p[2].join());                                // Line to P2
        cmds.push("A"+[opts.r0,opts.r0,0,largeArc,0,p[3]].join()); // Arc to  P3
        cmds.push("z");                                // Close path (Line to P0)
        cmds = cmds.join(' ');
        return cmds
    }

    function drawSector(s,f){
        let ms = that.ms ? getRandomIntInclusive(0,1) : 1;
        if(ms){
            let as = getAnnularSector(s);
            draw.path(as).fill(f);
        }
    }

    function getSectorParams(c,r0,r1,a0){
        let ai = getRandomNumeric(0, that.ai);
        let s = {
            cx: c[0], 
            cy: c[1],
            a0: a0, 
            a1: a0+ai,
            r0: r0, 
            r1: r1
        }
        return s;
    }

    function getColorFromPalette(p){
        let l = p.length;
        let i = getRandomIntInclusive(0, l);
        return p[i];
    }

    function drawBand(r0,r1){
        let sa = getRandomNumeric(0,360);
        let ea = sa + 360;
        let s0 = getSectorParams(that.c,r0,r1,d2r(sa))
        let s = s0;
        while(s['a1'] < (d2r(sa+360))){
            drawSector(s,getColorFromPalette(that.p))
            let aj = getRandomNumeric(0, that.aj)
            let a0 = s['a1'] + aj;
            s = getSectorParams(that.c,r0,r1,a0);
            s['a1'] = s['a1'] > d2r(ea) ? d2r(ea) : s['a1'];
        } 
        //drawSector(s,getColorFromPalette(that.p)) 
    }

    function generateArt(){
        let rl = that.wh[0];
        let r1 = that.cf * getRandomNumeric(0,that.ri);
        while(r1 < (1.5*rl)){
            let ri = getRandomNumeric(0, that.ri);
            r0 = r1;
            r1 = r0 + ri;
            //r1 = r1 > rl ? rl : r1;
            drawBand(r0,r1);
            let rj = getRandomNumeric(0, that.rj);
            r1 += rj;
        }
    }
}