import {createEvents} from '../src/db/createEvents';
import {prisma} from '../src/lib/prisma'
import {createParticipants} from "../src/db/createParticipants";

const seedData = async ()=> {
    await prisma.participant.deleteMany();
    await prisma.event.deleteMany();
    await prisma.organizer.deleteMany();
    await createEvents();
    await createParticipants()
}

await seedData();

