# reconnection

[![Dependency Status](https://david-dm.org/plantain-00/reconnection.svg)](https://david-dm.org/plantain-00/reconnection)
[![devDependency Status](https://david-dm.org/plantain-00/reconnection/dev-status.svg)](https://david-dm.org/plantain-00/reconnection#info=devDependencies)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/reconnection?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/reconnection/branch/master)
![Github CI](https://github.com/plantain-00/reconnection/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/reconnection.svg)](https://badge.fury.io/js/reconnection)
[![Downloads](https://img.shields.io/npm/dm/reconnection.svg)](https://www.npmjs.com/package/reconnection)
[![gzip size](https://img.badgesize.io/https://unpkg.com/reconnection?compression=gzip)](https://unpkg.com/reconnection)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Freconnection%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/reconnection)

## features

+ support browser and nodejs connection client
+ support client of websocket, tcp and so on

## install

`npm i reconnection`

## usage

```ts
// nodejs:
import Reconnector from "reconnection";
import * as WebSocket from "ws";

// browser(module):
import Reconnector from "reconnection";

// browser(script tag):
// <script src="./node_modules/reconnection/reconnection.min.js"></script>

let ws;
const reconnector = new Reconnector(() => {
    console.log(`connecting...`);
    ws = new WebSocket("ws://localhost:8000");
    ws.onclose = () => {
        console.log(`disconnected...`);
        reconnector.reconnect();
    };
    ws.onopen = () => {
        console.log("connected...");
        reconnector.reset();
    };
    ws.onerror = error => {
        console.log(error);
    };
});
```

## options

```ts
const reconnector = new Reconnector(() => {
    // ...
}, {
    startTimeout: 3000, // 3000->4500->6750->10125->15187->22781->30000->30000...
    increaseRate: 1.5,
    endTimeout: 30000,
    maxTimes: Infinity // for Infinity, never give up; for 3, just reconnect 3 times, if fails, stop.
});
```

## change logs

```ts
// v2
import Reconnector from "reconnection/nodejs/nodejs";
import Reconnector from "reconnection/browser/browser";

// v1
import { Reconnector } from "reconnection/nodejs";
import { Reconnector } from "reconnection/browser";
```
