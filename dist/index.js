"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pvm_config_1 = require("./pvm-config");
var pvm_1 = require("./pvm");
var root = process.cwd();
var config = new pvm_config_1.PvmConfig(root);
var pvm = new pvm_1.Pvm(root, config);
