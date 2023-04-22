import { Deferred } from "../core/utils/deffered";
import { generateHash } from "../core/utils/generateHash";

let inst: Api; 

export class Api {
    _opened = false;
    _counter = 0;
    _socket: WebSocket;
    _requests: Map<string, Deferred> = new Map();

    constructor() {
        this._socket = new WebSocket("ws://127.0.0.1:3000");
        this._socket.onopen = () => {
            this._opened = true;
        };
        this._socket.onmessage = (event) => {
            const json = JSON.parse(event.data);
            console.log(json);
            const traceId = json.headers['x-trace-id'];
            const def = this._requests.get(traceId);
            if (!def) console.log(`Not found request for requestId = ${traceId}`);
            else def.resolve(json);
            this._requests.delete(traceId);
        };
    }

    static inst(): Api {
        if (inst !== undefined) return inst;
        inst = new Api();
        return inst;
    }

    async call(command: string, params: any): Promise<any> {
        await new Promise((suc, rej) => setTimeout(suc, 1000));
        const traceId = generateHash(15);
        this._socket.send(JSON.stringify({ command, params, headers: { 'x-trace-id': traceId } }));
        const def = new Deferred();
        this._requests.set(traceId, def);
        return def.promise;
    }
}