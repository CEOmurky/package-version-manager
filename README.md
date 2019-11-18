# package-version-manager PVM

update package.json in version one step

## use case

When i made angular library and build this package with angular@cli has not update automatically package.json in version so i created `PVM`

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