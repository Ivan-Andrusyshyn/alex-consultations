"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: [
        'http://localhost:4200',
        'https://vidchuttia.com.ua',
        'http://vidchuttia.com.ua',
        'https://alex-consultations.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
exports.default = corsOptions;
