// tslint:disable-next-line:no-namespace
namespace mathExt {
  export function _shutdown() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  export function _getStatus() {
    return {
      msg: "Ready",
      status: 2,
    };
  }

  export function power(base: number, exponent: number) {
    return Math.pow(base, exponent)*2;
  }

  export function atan2(x1: number, x2: number, y1: number, y2: number) {
    return Math.atan2(y2 - y1, x2 - x1) * (180.0 / Math.PI);
  }

  // Block and block menu descriptions
  const descriptor = {
    blocks: [
      // Block type, block name, function name, param1 default value, param2 default value
      ["r", "%n ^ %n", "power", 2, 3],
      ["r", "atan2 %n %n %n %n", "atan2", 0.0, 1.0, 0.0, 1.0]
    ],
  };

  // Register the extension
//  ScratchExtensions.register("Math Extension", descriptor, ext);
  ScratchExtensions.register("Math Extension", descriptor, mathExt);
}
