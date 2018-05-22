// import { stringify } from "querystring";
// tslint:disable:no-namespace
// tslint:disable:no-console
// tslint:disable:object-literal-sort-keys
var collisions;
(function (collisions) {
    function _shutdown() {
        console.log("shutdown");
    }
    collisions._shutdown = _shutdown;
    function _stop() {
        console.log("stop");
        exitApp();
    }
    collisions._stop = _stop;
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    function _getStatus() {
        return {
            msg: "Ready",
            status: 2,
        };
    }
    collisions._getStatus = _getStatus;
    function power(base, exponent) {
        return Math.pow(base, exponent) * 2;
    }
    collisions.power = power;
    function atan2(x1, x2, y1, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * (180.0 / Math.PI);
    }
    collisions.atan2 = atan2;
    /*
  * Maak een array voor de sprites.
  * Elk element is een object van class Sprite
  * Het volgnr wordt als ident teruggeven aan Scratch
  */
    // let sprites: [Sprite] = new Array<Sprite>(5);
    const sprites = new Array();
    // area is -xSize to xSize and -ySize to ySize
    let xSize;
    let ySize;
    function toon() {
        console.log("Toon sprite data");
        console.log(`aantal: ${sprites.length}`);
        for (let i = 0; i < sprites.length; i++) {
            console.log(`xpos ${i}: ${sprites[i].xPos}`);
            console.log(`ypos ${i}: ${sprites[i].yPos}`);
            console.log(`xvel ${i}: ${sprites[i].xVel}`);
            console.log(`yvel ${i}: ${sprites[i].yVel}`);
        }
    }
    collisions.toon = toon;
    function spriteInit() {
        console.log(`id = ${sprites.length}`);
        const id = sprites.length++;
        sprites[id] = new Sprite();
        /*    sprites[++sprites.length] = new Sprite();
            sprites[++sprites.length] = new Sprite();*/
        return id;
    }
    collisions.spriteInit = spriteInit;
    function doit() {
        console.log("Do it");
        for (let i = 0; i < sprites.length; i++) {
            newPos(i);
        }
    }
    let timerId = null;
    function initApp(xs, ys) {
        console.log(`Init`);
        xSize = xs;
        ySize = ys;
        sprites.length = 0;
        timerId = setInterval(doit, 1000);
    }
    collisions.initApp = initApp;
    function exitApp() {
        console.log(`Exit`);
        sprites.length = 0;
        if (timerId != null) {
            clearInterval(timerId);
        }
    }
    collisions.exitApp = exitApp;
    // id, x-pos, y-pos, x-vel, x-vel, radius, mass
    function setData(sprite, xpos, ypos, xvel, yvel, radius, weight) {
        sprites[sprite].xPos = xpos;
        sprites[sprite].yPos = ypos;
        sprites[sprite].xVel = xvel;
        sprites[sprite].yVel = yvel;
        sprites[sprite].radius = radius;
        sprites[sprite].weight = weight;
    }
    collisions.setData = setData;
    function setPos(sprite, xpos, ypos) {
        sprites[sprite].xPos = xpos;
        sprites[sprite].yPos = ypos;
    }
    collisions.setPos = setPos;
    function setXSpeed(sprite, xspeed) {
        sprites[sprite].xVel = xspeed;
        console.log(`sprite: ${sprite}, speed: ${xspeed}:${sprites[sprite].xVel}`);
    }
    collisions.setXSpeed = setXSpeed;
    function setWeight(sprite, weight) {
        sprites[sprite].weight = weight;
        console.log(`sprite: ${sprite}, weight: ${weight}:${sprites[sprite].weight}`);
    }
    collisions.setWeight = setWeight;
    function setRadius(sprite, radius) {
        sprites[sprite].radius = radius;
        console.log(`sprite: ${sprite}, radius: ${radius}:${sprites[sprite].radius}`);
    }
    collisions.setRadius = setRadius;
    function setYSpeed(sprite, yspeed) {
        sprites[sprite].yVel = yspeed;
        console.log(`sprite: ${sprite}, speed: ${yspeed}:${sprites[sprite].yVel}`);
    }
    collisions.setYSpeed = setYSpeed;
    function getXpos(sprite) {
        return sprites[sprite].xPos;
    }
    collisions.getXpos = getXpos;
    /*
     * Hoe test ik botsingen?
     * Hier bereken ik het per sprite, maar het moet globaal
     * Eigenlijk zou je per tijdseenheid de nieuwe posities moeten berekenen
     * en dan kijken of er gebotst wordt waarna een en ander wordt aangepast
     * Dus alles hooguit een vast aantal keren per seconde, dus een framerate?
     * Hoe is de huidige?
     */
    function newPos(sprite) {
        const sp = sprites[sprite];
        sp.xPos += sp.xVel;
        sp.yPos += sp.yVel;
        if (sp.xPos > xSize || sp.xPos < -xSize) {
            sp.xVel = -sp.xVel;
        }
        if (sp.yPos > ySize || sp.yPos < -ySize) {
            sp.yVel = -sp.yVel;
        }
    }
    collisions.newPos = newPos;
    function getYpos(sprite) {
        return sprites[sprite].yPos;
    }
    collisions.getYpos = getYpos;
    function getXspeed(sprite) {
        return sprites[sprite].xVel;
    }
    collisions.getXspeed = getXspeed;
    function getYspeed(sprite) {
        return sprites[sprite].yVel;
    }
    collisions.getYspeed = getYspeed;
    /*
     * Niet zinvol hier async/await te gebruiken omdat de callback toch gedaan
     * moet worden. Het wachten en doorstarten gebeurt in ajax
     * De statuscode 404 wordt niet aangeroepen, hoort wel.
     * De error doet het alleen bij een timeout, en is essentieel
     * anders crashed ScratchX
     */
    function get_temp(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        const key = "be3ee5a8e8124c90dfda028152cb84f2";
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric" + "&appid=" + key,
            dataType: "jsonp",
            timeout: 500,
            statusCode: {
                200(xhr, status) {
                    console.log("200 - Success");
                },
                404(xhr, status) {
                    console.log("404 - Not Found");
                    console.log(`404: ${xhr}`);
                    console.log(status);
                    callback(-300);
                },
                503(xhr, status) {
                    console.log("503 - Server Problem");
                    console.log(xhr);
                },
            },
            error(a, b, c) {
                /*
                 * treedt op bij foute stad, maar wel na timeout, zonder timeout niks
                 * get fout direct te zien, maar waarom niet af te vangen?
                */
                console.log(`Error in ajax: ${a.getAllResponseHeaders} ${a.responseJSON} ${c} `);
                callback(-100);
            },
            success(weatherData) {
                let temperature;
                console.log("Succes in ajax");
                const cod = weatherData.cod;
                if (cod === 200) {
                    // Got the data - parse it and return the temperature
                    temperature = weatherData.main.temp;
                }
                else {
                    temperature = -200;
                }
                callback(temperature);
            },
        });
        console.log("Einde Ajax");
    }
    collisions.get_temp = get_temp;
    // Block and block menu descriptions
    const descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ["", "initApp %n %n", "initApp"],
            ["", "exitApp", "exitApp"],
            ["r", "spriteInit", "spriteInit"],
            ["", "set all data %n %n %n %n %n %n %n", "setData"],
            ["", "set position %n %n %n", "setPos"],
            ["", "new position %n", "newPos"],
            ["", "set radius %n %n", "setRadius"],
            ["", "set weight %n %n", "setWeight"],
            ["", "set x speed %n %n", "setXSpeed"],
            ["", "set y speed %n %n", "setYSpeed"],
            ["", "toon", "toon"],
            ["r", "get x pos %n", "getXpos"],
            ["r", "get y pos %n", "getYpos"],
            ["r", "get x speed %n", "getXspeed"],
            ["r", "get y speed %n", "getYspeed"],
            ["R", "temperature in %s", "get_temp", "Zoetermeer"],
        ],
    };
    // Register the extension
    //  ScratchExtensions.register("Math Extension", descriptor, ext);
    ScratchExtensions.register("Math Extension", descriptor, collisions);
})(collisions || (collisions = {}));
class Sprite {
    get xPos() {
        return this.lxPos;
    }
    set xPos(value) {
        this.lxPos = value;
    }
    get yPos() {
        return this.lyPos;
    }
    set yPos(value) {
        this.lyPos = value;
    }
    get xVel() {
        return this.lxVel;
    }
    set xVel(value) {
        this.lxVel = value;
    }
    get yVel() {
        return this.lyVel;
    }
    set yVel(value) {
        this.lyVel = value;
    }
    get weight() {
        return this.lMass;
    }
    set weight(value) {
        this.lMass = value;
    }
    get radius() {
        return this.lRadius;
    }
    set radius(value) {
        this.lRadius = value;
    }
}
//# sourceMappingURL=botsing.js.map