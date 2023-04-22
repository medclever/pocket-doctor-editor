import { observer } from "mobx-react-lite";
import { FC } from "react";
import { RouterModel } from "../../core";
import { ArticleItemModel } from "../../models";
import style from "./style.module.css";

interface Props {
  model: ArticleItemModel;
  router: RouterModel;
}
export const ArticleItemView: FC<Props> = observer(({ model, router }) => {
  const { item } = model;
  return (
    <div>
      <h1>Article ""</h1>
    </div>
  );
});
