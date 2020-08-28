"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var path_1 = __importDefault(require("path"));
var tempFolder = path_1.default.resolve(__dirname, '..', '..', 'temp');
exports.default = {
    tempFolder: tempFolder,
    uploadsFolder: path_1.default.resolve(tempFolder, 'uploads'),
    storage: multer_1.default.diskStorage({
        destination: tempFolder,
        filename: function (request, file, callback) {
            var fileHash = crypto_1.default.randomBytes(10).toString('HEX');
            var fileName = fileHash + "-" + file.originalname;
            return callback(null, fileName);
        },
    }),
};
