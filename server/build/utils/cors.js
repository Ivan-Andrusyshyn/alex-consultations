"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsOptions = () => (0, cors_1.default)({
    origin: [
        'http://localhost:4200',
<<<<<<< HEAD
        'http://www.vidchuttia.com.ua/',
=======
        'http://www.vidchuttia.com.ua',
        'http://vidchuttia.com.ua',
>>>>>>> 3e2d7f7de8ce92a6541a91390912a05731924b54
        'https://alex-consultations.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});
exports.default = corsOptions;
