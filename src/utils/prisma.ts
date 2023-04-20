import { PrismaClient } from '@prisma/client'
require('dotenv').config()

// export const prismaProd = new PrismaClient(
//     {
//         datasources: {
//             db: {
//                 url: process.env.DATABASE_URL,
//             },
//         }
//     }
// )

// export const prismaDev = new PrismaClient(
//     {
//         datasources: {
//             db: {
//                 url: process.env.DATABASE_URL_DEV,
//             },
//         }
//     }
// )

export const prisma = new PrismaClient();

export const utils = {
    isJSON: (data: string) => {
        try {
            JSON.parse(data)
        } catch (e) {
            return false
        }
        return true
    },
}