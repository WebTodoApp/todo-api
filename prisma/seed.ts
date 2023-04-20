import { PrismaClient } from '@prisma/client'
import { database } from '../src/server';
require('dotenv').config()

const statusLabels = ['Todo', 'In progress', 'Done'];

async function main() {
    statusLabels.map(async (label, index) => {
        await database.status.create({
            data: {
                label: label
            }
       })
    })
}


main().then(async () => {
    await database.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await database.$disconnect()
    process.exit(1)
})