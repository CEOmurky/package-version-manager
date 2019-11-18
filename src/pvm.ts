import prompts from 'prompts';
import fs from 'fs';
import { PvmConfig } from './pvm-config';

export class Pvm {
    private root: string;
    private config: PvmConfig;
    private packagePath: string;
    constructor(root: string, config: PvmConfig) {
        this.root = root;
        this.config = config;

        this.packagePath = this.root + this.config.packagePath + '/package.json';
    
        (async () => {
            const answer: {
                version: string
            } = await prompts([
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
            ]);
            this.updatePackageFile(VersionTypes[answer.version as VersionTypes]);
        })();
    }

    updatePackageFile(versionType: VersionTypes): void {
        const packageJson = JSON.parse(fs.readFileSync(this.packagePath, {encoding: 'utf8'}));
        const currentVersion = packageJson['version'] as string;
        
        if (!currentVersion) {
            throw new Error('Not found version in package.json');
        }

        if ( !/(\d+)\.(\d+)\.(\d+)/.test(currentVersion)) {
            throw new Error(`Invalid version: ${currentVersion}, node : https://en.wikipedia.org/wiki/Software_versioning`)
        }


        let targetVersion = currentVersion.split('.');
        switch(versionType) {
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


        fs.writeFileSync(this.packagePath, JSON.stringify(packageJson, null, 2));
    }
}


enum VersionTypes {
    Release = 'Release',
    Major = 'Major',
    Minor = 'Minor'
}