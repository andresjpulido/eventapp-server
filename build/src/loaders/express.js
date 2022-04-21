"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const api_1 = __importDefault(require("../api"));
const cors = require('cors');
const config_1 = __importDefault(require("../config"));
exports.default = async ({ app }) => {
    app.get('/status', (req, res) => {
        console.log("el servicio funciona correctamente");
        res.status(200).end();
    });
    app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json({
        inflate: true,
        limit: '100kb',
        reviver: null,
        strict: true,
        type: 'application/json',
        verify: undefined,
    }));
    app.use(config_1.default.api.prefix, (0, api_1.default)());
    function availableRoutes() {
        return app._router.stack
            .filter(r => r.route)
            .map(r => {
            return {
                method: Object.keys(r.route.methods)[0].toUpperCase(),
                path: r.route.path
            };
        });
    }
    console.log(JSON.stringify(availableRoutes(), null, 2));
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    return app;
};
//# sourceMappingURL=express.js.map