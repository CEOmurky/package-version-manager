import * as fs from 'fs';

export class PvmConfig {
    private root: string;
    
    constructor(root: string) {
        this.root = root;
        this.parseConfig();
    }

    parseConfig(): void {
        const configPath = this.root + '/pvm.config.json';
        let configJson;
        if (fs.existsSync(configPath)) configJson = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
        else configJson = {
            question: "Choose update version type",
            package_path: ""
        }
        
        this.question = configJson['question'];
        this.packagePath = configJson['package_path'];
    }
}

export interface PvmConfig {
    question: string;
    packagePath: string;
}