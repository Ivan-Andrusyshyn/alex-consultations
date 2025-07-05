"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: [
        'https://alex-consultations.vercel.app',
        'http://localhost:4200',
        'https://vidchuttia.com.ua',
        'http://vidchuttia.com.ua',
    ],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
exports.default = corsOptions;
