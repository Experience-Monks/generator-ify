# generator-ify [![Build Status](https://travis-ci.org/Jam3/generator-ify.svg?branch=master)](https://travis-ci.org/Jam3/generator-ify)

## About generator-ify

This is a Yeoman generator to get you up and running with Browserify based projects. Thie generator is inspired by [Beefy](https://www.npmjs.org/package/beefy).

[Beefy](https://www.npmjs.org/package/beefy) is AWESOME!!! However sometimes it's nice to get an entire project scaffold from which you can get up and running quickly.

The aim of this generator is to be as minimal as possible. The aim is to bring as little dependencies as possible to get up and running.

For useability this generator uses Grunt and a Connect server to run your project.



## Getting Started

### Install Yeoman
```bash
npm install -g yo
```

### Install and Use Generator

Install the the browserify generator:
```bash
npm i -g generator-ify
```

Create a directory and run the generator:
```bash
mkdir your_project && cd your_project
yo ify
```
If this is your first time using the generator just hit enter at all the prompts.

Almost there just run `grunt`:
```bash
grunt
```
Running `grunt` will continually `Browserify` the `index.js` in the root directory of
the project.

You can see the result by going to `http://localhost:8000` in your Browser.



## License

MIT
