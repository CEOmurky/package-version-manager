"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var PvmConfig = /** @class */ (function () {
    function PvmConfig(root) {
        this.root = root;
        this.parseConfig();
    }
    PvmConfig.prototype.parseConfig = function () {
        var configPath = this.root + '/pvm.config.json';
        var configJson;
        if (fs.existsSync(configPath))
            configJson = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
        else
            configJson = {
                question: "Choose update version type",
                package_path: ""
            };
        this.question = configJson['question'];
        this.packagePath = configJson['package_path'];
    };
    return PvmConfig;
}());
exports.PvmConfig = PvmConfig;
