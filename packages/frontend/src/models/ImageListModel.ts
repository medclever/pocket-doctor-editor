import { BaseModel, Loadable } from "../core";
import { Api } from "../api";

export class ImageListModel extends BaseModel implements Loadable {

  constructor() {
    super();
  }
  
  async load(): Promise<void> {
    // const list = await Api.inst().call('/article/GetArticleList', {});
    // console.log(list);
  }
}
