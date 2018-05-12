var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// tslint:disable:no-namespace
// tslint:disable:no-console
// tslint:disable:object-literal-sort-keys
var mathExt;
(function (mathExt) {
    function _shutdown() { }
    mathExt._shutdown = _shutdown;
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    function _getStatus() {
        return {
            msg: "Ready",
            status: 2,
        };
    }
    mathExt._getStatus = _getStatus;
    function power(base, exponent) {
        return Math.pow(base, exponent) * 2;
    }
    mathExt.power = power;
    function atan2(x1, x2, y1, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * (180.0 / Math.PI);
    }
    mathExt.atan2 = atan2;
    // Functions for block with type 'w' will get a callback function as the
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    // Promise delay
    function wait_random_pr(callback) {
        console.log("voor async:pr");
        //    pr.wait_random(callback);
        pr.callDelayedPromise(callback);
        console.log("na async:pr");
    }
    mathExt.wait_random_pr = wait_random_pr;
    // await async delay (moet nog komen)
    function wait_random_awac(callback) {
        console.log("voor async: awac");
        pr.callAWDelayedPromise(callback);
        console.log("na async:awac");
    }
    mathExt.wait_random_awac = wait_random_awac;
    // Callback delay vlg boek
    function wait_random_cb(callback) {
        const wait = Math.random();
        console.log("Waiting for " + wait + " seconds");
        function delayedAfterTimeout() {
            console.log(`delayedAfterTimeout`);
            callback(wait.toFixed(2));
        }
        setTimeout(delayedAfterTimeout, wait * 1000);
        console.log("After setTimeout");
    }
    mathExt.wait_random_cb = wait_random_cb;
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
                200: function (xhr, status) {
                    console.log("200 - Success");
                },
                404: function (xhr, status) {
                    console.log("404 - Not Found");
                    console.log(`404: ${xhr}`);
                    console.log(status);
                    callback(-300);
                },
                503: function (xhr, status) {
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
    mathExt.get_temp = get_temp;
    /*
    {"cod":"404","message":"city not found"}
    const weather_data = {
      coord: { lon: 4.49, lat: 52.06 },
      weather: [{ id: 310, main: "Drizzle", description: "light intensity drizzle rain", icon: "09d" }],
      base: "stations",
      main: { temp: 54.68, pressure: 998, humidity: 62, temp_min: 53.6, temp_max: 55.4 },
      visibility: 10000, wind: { speed: 11.41, deg: 160 },
      clouds: { all: 92 },
      dt: 1522688100,
      sys: { type: 1, id: 5214, message: 0.006, country: "NL", sunrise: 1522645995, sunset: 1522693117 },
      id: 2743856,
      name: "Zoetermeer",
      cod: 200,
    };
    */
    // Block and block menu descriptions
    const descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ["r", "%n ^ %n", "power", 2, 3],
            ["r", "atan2 %n %n %n %n", "atan2", 0.0, 1.0, 0.0, 1.0],
            ["R", "wait random cb", "wait_random_cb"],
            ["R", "wait random pr", "wait_random_pr"],
            ["R", "wait random awac", "wait_random_awac"],
            ["R", "cb temp in %s", "get_temp", "Zoetermeer"],
            ["R", "awac temperature in %s", "get_temp", "Zoetermeer"],
        ],
    };
    // Register the extension
    //  ScratchExtensions.register("Math Extension", descriptor, ext);
    ScratchExtensions.register("Math Extension", descriptor, mathExt);
})(mathExt || (mathExt = {}));
var pr;
(function (pr) {
    function wait_random(callback) {
        const wait = Math.random();
        console.log("Waiting for " + wait + " seconds");
        function delayedAfterTimeout() {
            console.log(`delayedAfterTimeout`);
            callback(wait.toFixed(2));
        }
        // de functie mag niet de callback zijn, het moet blijkbaar en definitie zijn
        setTimeout(delayedAfterTimeout, wait * 1000);
        console.log("After setTimeout");
    }
    pr.wait_random = wait_random;
    // Boek, maar ScratchX verwacht een callback ...
    // dus alles moet in een callback geplaatst worden?
    function delayedPromise() {
        return new Promise((resolve, reject) => {
            const wait = Math.random();
            function afterTimeout() {
                resolve(`resolve: ${wait.toFixed(2)}`);
            }
            if (wait > 0.5) {
                reject(`reject: ${wait.toFixed(2)}`);
            }
            else {
                setTimeout(afterTimeout, 1000);
            }
        });
    }
    function callDelayedPromise(callback) {
        console.log(`calling delayedPromise`);
        delayedPromise()
            .then((s) => {
            callback(s);
        })
            .catch((s) => {
            callback(s);
        });
    }
    pr.callDelayedPromise = callDelayedPromise;
    function callAWDelayedPromise(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const str = yield delayedPromise();
                callback(`success: ${str}`);
            }
            catch (error) {
                // execute on error
                callback(`error: ${error}`);
            } // code here waits for async call
        });
    }
    pr.callAWDelayedPromise = callAWDelayedPromise;
    /*
      interface IPromiseMessage {
        message: string;
        id: number;
      }
    
      function promiseWithInterface(): Promise<IPromiseMessage> {
        return new Promise<IPromiseMessage>(
          (
            resolve: (message: IPromiseMessage) => void,
            reject: (message: IPromiseMessage) => void
          ) => {
            resolve({ message: "test", id: 1 });
          }
        );
      }
      */
})(pr || (pr = {}));
//# sourceMappingURL=iife.1.js.map