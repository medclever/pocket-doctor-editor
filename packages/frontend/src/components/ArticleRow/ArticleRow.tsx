import { FC } from "react";
import style from "./style.module.css";

interface Props {
  name: string;
  onClickEdit: () => void;
}
export const ArticleRow: FC<Props> = ({ name, onClickEdit }) => {
  return (
    <div className={style.Row}>
      <div className={style.RowName}>{name}</div>
      <div className={style.RowRight}>
        <div className={style.RowButtons}>
          <a
            className={style.RowButton}
            onClick={(e) => {
              onClickEdit();
              e.preventDefault();
            }}
            href="/"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};
