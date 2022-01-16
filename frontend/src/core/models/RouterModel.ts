import { makeObservable, observable, runInAction } from "mobx";
import React from "react";
import { BaseModel } from ".";
import { isLoadable } from "..";
import { makeCancelable } from "../utils";
import { e } from "../events";

interface App {
  getModelByName(name: string): any;
  getViewByName(name: string): any;
}
export class RouterModel extends BaseModel {
  _current = "";
  _params = {};
  _initPromise: { promise: Promise<any>; cancel: () => void } | null = null;

  constructor(private app: App) {
    super();
    makeObservable(this, {
      _current: observable,
    });
  }

  get view() {
    const params: any = { router: this };
    const view = this.app.getViewByName(this._current);
    if (!view) return null;

    const model = this.app.getModelByName(this._current);
    if (model) {
      params.model = model;
    }

    return React.createElement(view, params);
  }

  async push(route: string, params: any = {}) {
    const view = this.app.getViewByName(route);
    const model = this.app.getModelByName(route);
    if (!view || !model) return null;

    if (this._initPromise !== null) {
      this._initPromise.cancel();
    }

    if (isLoadable(model)) {
      runInAction(() => {
        this._current = "$loading";
        this._params = {};
        this.event.push(e.routeSetCurrent, { route: this._current })
      });
      this._initPromise = makeCancelable(model.load(params ?? {}));
      this._initPromise.promise
        .then(() => {
          runInAction(() => {
            this._current = route;
            this._params = params ?? {};
            this._initPromise = null;
            this.event.push(e.routeSetCurrent, { route })
          });
        })
        .catch((e) => {
          if (!e.isCanceled) {
            runInAction(() => {
                this._current = "$error";
                this._params = {};
                this.event.push(e.routeSetCurrent, { route: this._current })
            });
            throw e;
          }
        });
    } else {
      runInAction(() => {
        this._current = route;
        this._params = params ?? {};
        this.event.push(e.routeSetCurrent, { route })
      });
    }
  }
}
