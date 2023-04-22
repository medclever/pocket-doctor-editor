import { FC } from "react";
import { observer } from "mobx-react-lite";

import { RouterModel } from "../../core";
import { ArticleListModel } from "../../models/ArticleListModel";
import style from "./style.module.css";

interface Props {
  model: ArticleListModel;
  router: RouterModel;
}
export const ArticleListView: FC<Props> = observer(({ model, router }) => {
  const { items } = model;
  return (
    <div>
      <h1>Articles</h1>
      {items.length > 0 && (
        <div className={style.ResourceRows}>
          {items.map((item, index) => (
            <div className={style.ResourceRowPlace}>{item.position} {item.title}</div>
          ))}
        </div>
      )}
    </div>
  );
});
