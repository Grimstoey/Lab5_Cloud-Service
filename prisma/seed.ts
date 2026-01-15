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

seedData()
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });


