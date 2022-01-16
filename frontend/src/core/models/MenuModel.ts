import { nanoid } from "nanoid";
import { makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from ".";
import { e } from "../events";

export class MenuModel extends BaseModel {
  _current = "";
  _target = "";
  _items: { id: string, title: string; routeNames: string[] }[] = [];

  constructor() {
    super();
    makeObservable(this, {
      _current: observable,
      _target: observable,
      _items: observable,
    });
  }

  init() {
    this.event.subscribe(e.routeSetCurrent, (params: any) => {
      this.setCurrent(params.route)
    })
  }

  item(title: string, routeNames: string[]) {
    this._items = [
      ...this._items,
      ...[{ id: nanoid(), title, routeNames }],
    ];

    return this;
  }

  getItemById(id: string) {
    return this._items.find(i => i.id === id);
  }

  getItemByRoute(name: string) {
    return this._items.find(i => i.routeNames.includes(name));
  }

  isCurrent(id: string): any {
    const item = this.getItemById(id);
    if (!item) return false;

    return item.routeNames.includes(this._current);
  }

  isTarget(id: string): any {
    const item = this.getItemById(id);
    if (!item) return false;

    return item.routeNames.includes(this._target);
  }

  setCurrent(name: string) {
    if (!this.getItemByRoute(name)) return;

    runInAction(() => {
      this._current = name;
      this._target = "";
    })
  }

  setTarget(name: string) {
    if (!this.getItemByRoute(name)) return;
    
    runInAction(() => {
      this._current = "";
      this._target = name;
    });
  }
}
