import { EmptyEvent, IEvent } from "../events";

export class BaseModel {
    // Создается заглушка, чтобы избежать null-ов и чтобы оставить конструктор открытым
    protected event: IEvent = new EmptyEvent();

    public setEvent(event: IEvent) {
        this.event = event;
    }

    public init() {}
}