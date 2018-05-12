//import { stringify } from "querystring";

// tslint:disable:no-namespace
// tslint:disable:no-console
// tslint:disable:object-literal-sort-keys
namespace mathExt {

  export function _shutdown() { }

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  export function _getStatus() {
    return {
      msg: "Ready",
      status: 2,
    };
  }

  export function power(base: number, exponent: number) {
    return Math.pow(base, exponent) * 2;
  }

  export function atan2(x1: number, x2: number, y1: number, y2: number) {
    return Math.atan2(y2 - y1, x2 - x1) * (180.0 / Math.PI);
  }

  // Functions for block with type 'w' will get a callback function as the
  // final argument. This should be called to indicate that the block can
  // stop waiting.
  // Promise delay

  export function wait_random_pr(callback: (s: string) => void) {
    console.log("voor async:pr");
    //    pr.wait_random(callback);
    pr.callDelayedPromise(callback);
    console.log("na async:pr");
  }

  // await async delay (moet nog komen)
  export function wait_random_awac(callback: (s: string) => void) {
    console.log("voor async: awac");
    pr.callAWDelayedPromise(callback);
    console.log("na async:awac");
  }

  // Callback delay vlg boek
  export function wait_random_cb(callback: (s: string) => void) {
    const wait: number = Math.random();
    console.log("Waiting for " + wait + " seconds");
    function delayedAfterTimeout() {
      console.log(`delayedAfterTimeout`);
      callback(wait.toFixed(2));
    }
    setTimeout(delayedAfterTimeout, wait * 1000);
    console.log("After setTimeout");
  }

  /*
   * Niet zinvol hier async/await te gebruiken omdat de callback toch gedaan
   * moet worden. Het wachten en doorstarten gebeurt in ajax
   * De statuscode 404 wordt niet aangeroepen, hoort wel.
   * De error doet het alleen bij een timeout, en is essentieel
   * anders crashed ScratchX
   */
  export function get_temp(location: string, callback: (t: number) => void) {
    // Make an AJAX call to the Open Weather Maps API
    const key: string = "be3ee5a8e8124c90dfda028152cb84f2";
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric" + "&appid=" + key,
      dataType: "jsonp",
      timeout: 500,
      statusCode: {
        200: function(xhr, status) {
          console.log("200 - Success");
        },
        404: function(xhr, status) {
          console.log("404 - Not Found");
          console.log(`404: ${xhr}`);
          console.log(status);
          callback(-300);
        },
        503: function(xhr, status) {
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
      success(weatherData) { // cod = 200, bij 404 andere data
        let temperature;
        console.log("Succes in ajax");
        const cod = weatherData.cod;
        if (cod === 200) {
          // Got the data - parse it and return the temperature
          temperature = weatherData.main.temp;
        } else {
          temperature = -200;
        }
        callback(temperature);
      },
    });
    console.log("Einde Ajax");
  }

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
}

namespace pr {
  export function wait_random(callback: (s: string) => void) {
    const wait: number = Math.random();
    console.log("Waiting for " + wait + " seconds");
    function delayedAfterTimeout() {
      console.log(`delayedAfterTimeout`);
      callback(wait.toFixed(2));
    }
    // de functie mag niet de callback zijn, het moet blijkbaar en definitie zijn
    setTimeout(delayedAfterTimeout, wait * 1000);
    console.log("After setTimeout");
  }

  // Boek, maar ScratchX verwacht een callback ...
  // dus alles moet in een callback geplaatst worden?
  function delayedPromise(): Promise<string> {
    return new Promise<string>
      (
      (
        resolve: (str: string) => void,
        reject: (str: string) => void,
      ) => {
        const wait: number = Math.random();
        function afterTimeout() {
          resolve(`resolve: ${wait.toFixed(2)}`);
        }
        if (wait > 0.5) {
          reject(`reject: ${wait.toFixed(2)}`);
        } else {
          setTimeout(afterTimeout, 1000);
        }
      },
    );
  }

  export function callDelayedPromise(callback: (s: string) => void) {
    console.log(`calling delayedPromise`);
    delayedPromise()
      .then(
        (s: string) => {
          callback(s);
        })
      .catch(
        (s: string) => {
          callback(s);
        });
  }

  export async function callAWDelayedPromise(callback: (s: string) => void) {
    try {
      const str: string = await delayedPromise();
      callback(`success: ${str}`);
    } catch (error) {
      // execute on error
      callback(`error: ${error}`);
    } // code here waits for async call
  }
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
}
