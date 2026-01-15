import {prisma} from '../lib/prisma'
export function findByUsername(username: string) {
    return prisma.user.findUnique({
        where: {
            username: username,
        },
        include: {
            roles: true,
            organizer: true,          
        },
    });
}
