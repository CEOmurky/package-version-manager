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
        else configJson = JSON.parse(fs.readFileSync('../pvm.config.json', {encoding: 'utf8'}));
        
        this.question = configJson['question'];
        this.packagePath = configJson['package_path'];
    }
}

export interface PvmConfig {
    question: string;
    packagePath: string;
}