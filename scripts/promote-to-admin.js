const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function promote(email) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' },
        });
        console.log(`Successfully promoted ${user.email} to ADMIN.`);
    } catch (error) {
        console.error(`Failed to promote ${email}:`, error.message);
    } finally {
        await prisma.$disconnect();
    }
}

const email = process.argv[2];
if (!email) {
    console.error('Please provide an email address.');
    process.exit(1);
}

promote(email);
