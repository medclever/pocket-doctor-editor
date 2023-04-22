import { FC } from "react";
import { observer } from "mobx-react-lite";

import { RouterModel } from "../../core";
import { ArticleListModel } from "../../models";
import style from "./style.module.css";

interface Props {
  model: ArticleListModel;
  router: RouterModel;
}
export const ResourceListView: FC<Props> = observer(({ model, router }) => {
  // const { items, filter } = model;
  return (
    <div>
      <h1>Resources</h1>
    </div>
  );
});
