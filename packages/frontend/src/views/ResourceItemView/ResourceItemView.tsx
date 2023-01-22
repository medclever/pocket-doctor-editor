import { observer } from "mobx-react-lite";
import { FC } from "react";
import { RouterModel } from "../../core";
import { ResourceItemModel } from "../../models";
import style from "./style.module.css";

interface Props {
  model: ResourceItemModel;
  router: RouterModel;
}
export const ResourceItemView: FC<Props> = observer(({ model, router }) => {
  const { item } = model;
  const attrs: any[] = model.item.attrs ?? [];
  return (
    <div>
      <h1>Resource "{item.id}"</h1>
    </div>
  );
});
