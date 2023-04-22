export class Deferred {
    promise: Promise<any>
    reject: (reason?: any) => void = () => {};
    resolve: (value: any) => void = () => {};

    constructor() {
      this.promise = new Promise((resolve, reject)=> {
        this.reject = reject
        this.resolve = resolve
      })
    }
  }