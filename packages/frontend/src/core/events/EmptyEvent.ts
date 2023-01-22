import { IEvent } from ".";

export class EmptyEvent implements IEvent {
    push(name: string, params?: any) {}
    subscribe(name: string, callback: (params?: any) => void) {}
}