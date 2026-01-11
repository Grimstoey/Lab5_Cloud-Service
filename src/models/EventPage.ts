import type {eventModel as Event} from "../generated/prisma/models/event";

export interface PageEvent {
    count: number;
    events: Event[];
   }
