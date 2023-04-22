import { FC } from "react";
import { observer } from "mobx-react-lite";

import { RouterModel } from "../../core";
import { ArticleListModel } from "../../models";
import style from "./style.module.css";
import { ImageListModel } from "../../models/ImageListModel";

interface Props {
  model: ImageListModel;
  router: RouterModel;
}
export const ImageListView: FC<Props> = observer(({ model, router }) => {
  // const { items, filter } = model;
  return (
    <div>
      <h1>Images</h1>
    </div>
  );
});
