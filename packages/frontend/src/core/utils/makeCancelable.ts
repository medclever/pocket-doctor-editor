export const makeCancelable = (promise: any): { promise: Promise<any>, cancel: () => void } => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val: any) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error: any) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};