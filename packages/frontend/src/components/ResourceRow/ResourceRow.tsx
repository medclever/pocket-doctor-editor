import { FC } from "react";
import style from "./style.module.css";

interface Props {
  name: string;
  changed: string[];
  onClickEdit: () => void;
}
export const ResourceRow: FC<Props> = ({ name, changed, onClickEdit }) => {
  return (
    <div className={style.resourceRow}>
      <div className={style.resourceRowName}>{name}</div>
      <div className={style.resourceRowRight}>
        <div className={style.resourceRowChanged}>{changed.join(", ")}</div>
        <div className={style.resourceRowButtons}>
          <a
            className={style.resourceRowButton}
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
