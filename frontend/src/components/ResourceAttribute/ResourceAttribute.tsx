import classNames from "classnames";
import { FC } from "react";
import { ResourceAttributeType } from "../../types";
import { LongTextAttribute } from "./attrs";
import style from "./style.module.css";

interface Props {
  attr: ResourceAttributeType;
  onChangeNext: (field: string, value: string) => void;
}
export const ResourceAttribute: FC<Props> = ({ attr, onChangeNext }) => {
  return (
    <div>
      <div className={style.title}>{attr.label}</div>
      {attr.field === "description" && (
        <LongTextAttribute first={attr.applied} second={attr.change ?? ""} />
      )}
      <div className={style.row}>
        <div
          className={classNames(style.item, {
            [style.item_override]: attr.overrideApplied,
          })}
        >
          {attr.field === "description" && (
            <textarea
              className={style.itemInput}
              disabled
              value={attr.applied ?? ""}
            />
          )}
          {attr.field !== "description" && (
            <input
              className={style.itemInput}
              disabled
              value={attr.applied ?? ""}
            />
          )}
          <br />
          {!!attr.overrideApplied && (
            <div className={style.overrideFrom}>{attr.overrideApplied}</div>
          )}
        </div>
        <div
          className={classNames(style.item, {
            [style.item_override]: attr.overrideChange,
          })}
        >
          {attr.field === "description" && (
            <textarea
              className={style.itemInput}
              value={attr.change ?? ""}
              onChange={(e) => onChangeNext(attr.field, e.target.value)}
            />
          )}
          {attr.field !== "description" && (
            <input
              className={style.itemInput}
              value={attr.change ?? ""}
              onChange={(e) => onChangeNext(attr.field, e.target.value)}
            />
          )}
          <br />
          {!!attr.overrideChange && (
            <div className={style.overrideFrom}>{attr.overrideChange}</div>
          )}
        </div>
      </div>
    </div>
  );
};
