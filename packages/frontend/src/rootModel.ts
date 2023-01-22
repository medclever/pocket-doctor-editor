import { Application, DIDefault } from "./core";
import { ResourceItemModel, ResourceListModel } from "./models";
import { ResourceItemView, ResourceListView } from "./views";

export interface DI extends DIDefault {}
export const rootModel = new Application<DI>();
export enum r {
  "resourceList" = "resourceList",
  "resourceItem" = "resourceItem",
}

rootModel
  .modelView(r.resourceList, new ResourceListModel(), ResourceListView)
  .modelView(r.resourceItem, new ResourceItemModel(), ResourceItemView);

rootModel.menu().item("Resources", [r.resourceList, r.resourceItem]);
