import type {eventModel as Event} from "../generated/prisma/models/event";
import * as repo from "../repositories/EventRepositoryPrisma";

export async function getEventByCategory(category: string) {
    return repo.getEventByCategory(category);
}

export async function getAllEvents(){
    return repo.getAllEventsWithOrganizer();
}

export async function getEventById(id: number) {
    return repo.getEventById(id);
}

export async function addEvent(newEvent: Event) {
    return repo.addEvent(newEvent);
}

export function getAllEventsWithPagination(keyword: string, pageSize: number, pageNo: number) {
  return repo.getAllEventsWithOrganizerPagination(keyword, pageSize, pageNo);
}

export function count(){
  return repo.countEvent();
}
