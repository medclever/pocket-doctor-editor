export interface IEvent {
    push(name: string, params?: any): void;
    subscribe(name: string, callback: (params?: any) => void): void;
}

export enum e {
    routeSetCurrent = "$route_SetCurrent",
}