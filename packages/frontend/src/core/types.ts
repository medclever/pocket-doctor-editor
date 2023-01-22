import { RouterModel } from "./models/RouterModel"

export interface DIDefault {
    $router: RouterModel
}

export interface Loadable {
    load<T>(params?: any): Promise<T | void>;
}

export function isLoadable(value: any): value is Loadable {
    return value.load !== undefined;
}