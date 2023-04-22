import { makeObservable, observable, runInAction } from "mobx";
import { BaseModel, Loadable } from "../core";
import { ArticleItemShort } from "../types";
import { Api } from "../api";

export class ArticleListModel extends BaseModel implements Loadable {
  items: ArticleItemShort[] = [];

  constructor() {
    super();
    makeObservable(this, {
      items: observable,
    });
  }
  
  async load(): Promise<void> {
    const { response } = await Api.inst().call('article/GetArticleList', {});
    this.items = response.result;
  }
}
