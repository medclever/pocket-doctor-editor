import { makeObservable, observable } from "mobx";
import { BaseModel, Loadable } from "../core";
import { ArticleItem } from "../types";

export class ArticleItemModel extends BaseModel implements Loadable {
  item: ArticleItem = {
    id: '',
    position: 1,
    title: '',
  };

  constructor() {
    super();
    makeObservable(this, {
      item: observable,
    });
  }

  async load(params: { id: string }): Promise<void> {

  }
}
