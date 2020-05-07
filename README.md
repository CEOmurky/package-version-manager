# package-version-manager PVM

update package.json in version for one step

## use case

for auto update version

## example

```json
"scripts": {
    "build-with-version": "pvm && ng build someProject"
}
```

## install

- npm
`npm install --save-dev package-version-manager`

- yarn
`yarn add -D package-version-manager`

## custom

Default PVM update root in package.json but if you want update another folder in package.json

create pvm.config.json and write "package_path"


### example

```
SomeProject
└─role
    └─lal
        └─ package.json
```

```json
// pvm.config.json
{
    "question": "Choose update version",
    "package_path": "/role/lal"
}
```
