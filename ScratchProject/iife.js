// tslint:disable-next-line:no-namespace
var mathExt;
(function (mathExt) {
    function _shutdown() { }
    mathExt._shutdown = _shutdown;
    ;
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
})(mathExt || (mathExt = {}));
//# sourceMappingURL=iife.js.map