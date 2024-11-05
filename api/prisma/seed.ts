import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    await prisma.user.create({
        data:{
            id: "be537051-3fc5-ce6f-fc87-58c3770cb7cb",
            username: 'mono0218',
        }
    })

    await prisma.service.create({
        data:{
            id: "3a26da0b-ac1a-73f5-e616-b8c044a18fcb",
            name: "TestService",
            hashKey: "a8d627d93f518e9096b6f40e36d27b7660fa26d318ef1adc43da750e49ebe4be"
        }
    })

    await prisma.userPoint.create({
        data:{
            id: "0227ec37-78dc-9fcb-ce28-e1f755750614",
            userId: "be537051-3fc5-ce6f-fc87-58c3770cb7cb",
            serviceId: "3a26da0b-ac1a-73f5-e616-b8c044a18fcb",
            point: 100
        }
    })

    await prisma.qrcode.create({
        data:{
            id: "0efd68d1-a36b-b4a6-aee7-78759270c79a",
            userId: "be537051-3fc5-ce6f-fc87-58c3770cb7cb",
            serviceId: "3a26da0b-ac1a-73f5-e616-b8c044a18fcb",
        }
    })

    console.log('Data seeding complete.');
}

main()
    .catch(err => {
        console.error('Error seeding data:', err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
