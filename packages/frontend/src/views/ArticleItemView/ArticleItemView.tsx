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
    <div className={style.container}>
      <h1 className={style.title}>{item.position}. {item.title}</h1>
      <div className={style.label}>Title</div>
      <input className={style.text} value={item.title} /><br />
      <div className={style.label}>Necessary</div>
      <textarea className={style.textArea} value={item.necessary} /><br />
      <div className={style.label}>Possible</div>
      <textarea className={style.textArea} value={item.possible} /><br />
      <div className={style.label}>Must not</div>
      <textarea className={style.textArea} value={item.must_not} /><br />
      <div className={style.label}>Important</div>
      <textarea className={style.textArea} value={item.important} /><br />
      <div className={style.label}>Important</div>
      <textarea className={style.textArea} value={item.text} /><br />
    </div>
  );
});
