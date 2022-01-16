import { IEvent } from "./types";

export class Event implements IEvent {
    private _subscribes: Map<string, ((params?: any) => void)[]> = new Map();

    push(name: string, params?: any) {
        if (this._subscribes.has(name)) {
            const callbacks = this._subscribes.get(name) ?? [];
            callbacks.forEach(c => c(params ?? {}));
        }        
    }

    subscribe(name: string, callback: (params?: any) => void) {
        if (this._subscribes.has(name)) {
            this._subscribes.get(name)?.push(callback);
        } else {
            this._subscribes.set(name, [callback]);
        }
    }
}