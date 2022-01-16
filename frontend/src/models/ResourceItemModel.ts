import { makeObservable, observable } from "mobx";
import { BaseModel, Loadable } from "../core";
import { ResourceItem } from "../types";

export class ResourceItemModel extends BaseModel implements Loadable {
  item: ResourceItem = {
    id: '',
    attrs: [],
  };

  constructor() {
    super();
    makeObservable(this, {
      item: observable,
    });
  }

  async load(params: { id: string }): Promise<void> {
    // const response = await this.axios.get(`/api/v1/resources/${params.id}`);
    // runInAction(async () => {
    //   this.item = response.data.data
    // });
  }
}
