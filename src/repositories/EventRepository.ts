import type Event from "../models/Event";
const events: Event[] = [
    {
        id: 1,
        category: "Music",
        title: "Concert",
        description: "A live concert",
        location: "London",
        date: "2021-07-01",
        time: "19:00",
        petsAllowed: false,
        organizer: "Live Nation"
    },
    {
        id: 2,
        category: "Music",
        title: "Festival",
        description: "A music festival",
        location: "Manchester",
        date: "2021-07-15",
        time: "12:00",
        petsAllowed: true,
        organizer: "Festival Republic"
    },
    {
        id: 3,
        category: "Sports",
        title: "Football Match",
        description: "A football match",
        location: "Liverpool",
        date: "2021-08-01",
        time: "15:00",
        petsAllowed: false,
        organizer: "Premier League"
    },
    // ...existing code...
    {
        id: 4,
        category: "Music",
        title: "Jazz Night",
        description: "An evening of smooth jazz",
        location: "New Orleans",
        date: "2021-09-10",
        time: "19:00",
        petsAllowed: true,
        organizer: "Jazz Fest"
    },
    {
        id: 5,
        category: "Theatre",
        title: "Shakespeare in the Park",
        description: "A performance of Hamlet",
        location: "Central Park",
        date: "2021-10-05",
        time: "18:00",
        petsAllowed: false,
        organizer: "NYC Theatre Group"
    },
    {
        id: 6,
        category: "Food",
        title: "Food Truck Festival",
        description: "A variety of food trucks offering delicious meals",
        location: "San Francisco",
        date: "2021-11-20",
        time: "12:00",
        petsAllowed: true,
        organizer: "Foodie Events"
    }
];

export async function getEventByCategory(category: string): Promise<Event[]> {
    const filteredEvents = events.filter((event) => event.category === category);
    return filteredEvents;
}

export async function getAllEvents(): Promise<Event[]> {
    return events;
}

export async function getEventById(id: number): Promise<Event | undefined> {
    return events.find((event) => event.id === id);
}

export async function addEvent(newEvent: Event): Promise<Event> {
    newEvent.id = events.length + 1;
    events.push(newEvent);
    return newEvent;
}