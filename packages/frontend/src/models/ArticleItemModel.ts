import { makeObservable, observable } from "mobx";
import { BaseModel, Loadable } from "../core";
import { ArticleItem } from "../types";
import { Api } from "../api";

export class ArticleItemModel extends BaseModel implements Loadable {
  item: ArticleItem = {
    id: '',
    position: 1,
    title: '',
    necessary: '',
    possible: '',
    must_not: '',
    important: '',
    text: '',
  };

  constructor() {
    super();
    makeObservable(this, {
      item: observable,
    });
  }

  async load(params: { id: string }): Promise<void> {
    const { response } = await Api.inst().call('article/GetArticle', { id: params.id });
    this.item = response.result;
  }
}
