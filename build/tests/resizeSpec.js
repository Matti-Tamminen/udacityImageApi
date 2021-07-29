"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// testing endpoint functionality
describe('testing resize functionality', function () {
    var request = require('supertest');
    var express = require('express');
    var sharp = require('sharp');
    var fs = require('fs');
    var path = require('path');
    // path to full sized images
    var root = path.resolve('./');
    var filepath = path.join(root, 'tests', 'test_images', 'kuva.jpg'); // test image
    var app = express();
    app.get('/resize', function (req, res) {
        var _a = req.query, name = _a.name, width = _a.width, height = _a.height;
        res.status(200).json({ name: name, width: width, height: height });
    });
    it('answers 200 with right parameters', function () {
        request(app)
            .get('/resize?name=pic&width=200&height=300')
            .expect(200)
            .expect({ name: 'pic', width: '200', height: '300' })
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
    it('return and resizes images with sharp', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, info;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sharp(filepath)
                        .resize(200)
                        .toBuffer({ resolveWithObject: true })];
                case 1:
                    _a = _b.sent(), data = _a.data, info = _a.info;
                    expect(data).not.toBeFalsy();
                    expect(info.width).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the image file from directory', function () {
        var image = fs.readFileSync(filepath, function (err, img) {
            img.toString('base64');
        });
        expect(image).not.toBeFalsy();
    });
});
