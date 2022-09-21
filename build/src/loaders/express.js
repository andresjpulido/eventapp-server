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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
let swaggerFile = `${process.cwd()}/public/swagger.json`;
console.log("swaggerFile", swaggerFile);
let swaggerData = fs_1.default.readFileSync(swaggerFile, 'utf-8');
let swaggerJSON = JSON.parse(swaggerData);
let swaggerCSS = fs_1.default.readFileSync((`${process.cwd()}/public/swagger.css`), 'utf8');
exports.default = async ({ app }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.enable('trust proxy');
    // middlewares
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
    app.use(express.static("public"));
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJSON, null, null, swaggerCSS));
    let apipaths = (0, api_1.default)();
    app.use(config_1.default.api.prefix, apipaths);
    function apis(apipaths) {
        let items = apipaths.stack
            .filter(r => r.route)
            .map(r => {
            return config_1.default.api.prefix + r.route.path;
        });
        return items;
    }
    function availableRoutes(apipaths) {
        let items = apipaths.stack
            .filter(r => r.route)
            .map(r => {
            return {
                method: Object.keys(r.route.methods)[0].toUpperCase(),
                path: r.route.path
            };
        });
        console.log("Routes Created");
        items.forEach(element => {
            console.log("  ", element.method, element.path);
        });
    }
    availableRoutes(apipaths);
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    return app;
};
//# sourceMappingURL=express.js.map