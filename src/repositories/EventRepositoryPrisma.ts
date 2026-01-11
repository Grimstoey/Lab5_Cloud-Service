import {prisma} from '../lib/prisma'
import {Prisma} from "../generated/prisma/client";
import type {eventModel as Event} from "../generated/prisma/models/event";
import {PageEvent} from "../models/EventPage";


export function getEventByCategory(category: string) {
    return prisma.event.findMany({
        where: {category},
    });
}

export function getAllEvents() {
    return prisma.event.findMany();
}

export function getEventById(id: number) {
    return prisma.event.findUnique({
        where: {id},
        include: {organizer: true},
        omit: {organizerId: true}
    });
}

export function addEvent(newEvent: Event) {
    return prisma.event.create({
        data: {
            category: newEvent.category,
            title: newEvent.title,
            description: newEvent.description,
            location: newEvent.location,
            date: newEvent.date,
            time: newEvent.time,
            petsAllowed: newEvent.petsAllowed

        }
    });
}

export function getAllEventsWithOrganizer() {
    return prisma.event.findMany({
        select: {
            id: true,
            category: true,
            title: true,
            description: true,
            location: true,
            date: true,
            time: true,
           petsAllowed: true,

            organizerId: false,
            organizer: {
                select: {
                    name: true
                }
            },
            
        }
    });
}

export async function getAllEventsWithOrganizerPagination(
    keyword: string,
    pageSize: number,
    pageNo: number,
) {
    const where = {
        OR: [
            {
                title: {
                    contains: keyword,
                    mode: Prisma.QueryMode.insensitive
                }
            },
            {description: {contains: keyword}},
            {category: {contains: keyword}},
            {organizer: {name: {contains: keyword}}}

        ]
    }
    const events = await prisma.event.findMany({
        where,
        skip: pageSize * (pageNo - 1),
        take: pageSize,
        select: {
            id: true,
            category: true,
            title: true,
            organizerId: false,
            organizer: {
                select: {
                    name: true
                }
            }
        }
    });
    const count = await prisma.event.count({where});
    return {count, events} as unknown as PageEvent; //provide unknown because of type on return may not match with prisma type
}

export function countEvent() {
    return prisma.event.count();
}
