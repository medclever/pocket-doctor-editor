import { makeObservable, observable } from "mobx";
import { BaseModel, Loadable } from "../core";
import { ResourceItemShort } from "../types";
import { Metacom } from 'metacom';

//@ts-ignore
window.metacom = Metacom.create('http://localhost:8002');

type filterValue = 'hasChange' | 'toSync';
export class ResourceListModel extends BaseModel implements Loadable {
  items: ResourceItemShort[] = [];
  filter: Partial<{ [key in filterValue]: "1" }> = {};

  constructor() {
    super();
    makeObservable(this, {
      items: observable,
      filter: observable,
    });
  }
  
  async load(): Promise<void> {
    // const metacom = Metacom.create('http://localhost:8000');
    // const { api } = metacom;
    // metacom.load('article')
    // @ts-ignore
    // console.log(await api.article.list({}))
    // const filter = Object.entries(this.filter).map(([key, value]) => `${key}=${value}`).join("&");
    // const response = await axios.get(config.apiHost + "/api/v1/resources" + (filter?'?'+filter:''));
    // runInAction(async () => {
    //   this.items = response.data.data;
    // });
  }
}
