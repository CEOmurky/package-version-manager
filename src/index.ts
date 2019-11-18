import { PvmConfig } from "./pvm-config";
import { Pvm } from "./pvm";

const root = process.cwd();

const config = new PvmConfig(root);
const pvm = new Pvm(root, config);