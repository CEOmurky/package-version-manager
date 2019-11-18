"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = __importDefault(require("prompts"));
var fs_1 = __importDefault(require("fs"));
var Pvm = /** @class */ (function () {
    function Pvm(root, config) {
        var _this = this;
        this.root = root;
        this.config = config;
        this.packagePath = this.root + this.config.packagePath + '/package.json';
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'select',
                                name: 'version',
                                message: config.question,
                                choices: [
                                    { title: VersionTypes.Release, value: VersionTypes.Release },
                                    { title: VersionTypes.Major, value: VersionTypes.Major },
                                    { title: VersionTypes.Minor, value: VersionTypes.Minor }
                                ],
                            }
                        ])];
                    case 1:
                        answer = _a.sent();
                        this.updatePackageFile(VersionTypes[answer.version]);
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Pvm.prototype.updatePackageFile = function (versionType) {
        var packageJson = JSON.parse(fs_1.default.readFileSync(this.packagePath, { encoding: 'utf8' }));
        var currentVersion = packageJson['version'];
        if (!currentVersion) {
            throw new Error('Not found version in package.json');
        }
        if (!/(\d+)\.(\d+)\.(\d+)/.test(currentVersion)) {
            throw new Error("Invalid version: " + currentVersion + ", node : https://en.wikipedia.org/wiki/Software_versioning");
        }
        var targetVersion = currentVersion.split('.');
        switch (versionType) {
            case VersionTypes.Release:
                targetVersion[0] = (+targetVersion[0] + 1).toString();
                break;
            case VersionTypes.Major:
                targetVersion[1] = (+targetVersion[1] + 1).toString();
                break;
            case VersionTypes.Minor:
                targetVersion[2] = (+targetVersion[2] + 1).toString();
                break;
        }
        packageJson['version'] = targetVersion.join('.');
        fs_1.default.writeFileSync(this.packagePath, JSON.stringify(packageJson, null, 2));
    };
    return Pvm;
}());
exports.Pvm = Pvm;
var VersionTypes;
(function (VersionTypes) {
    VersionTypes["Release"] = "Release";
    VersionTypes["Major"] = "Major";
    VersionTypes["Minor"] = "Minor";
})(VersionTypes || (VersionTypes = {}));
