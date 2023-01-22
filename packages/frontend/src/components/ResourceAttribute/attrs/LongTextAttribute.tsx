import { FC } from "react";
import * as Diff from "diff";
import style from "./style.module.css";
import { encode, decode } from "html-entities";

type Props = {
  first: string;
  second?: string;
};
export const LongTextAttribute: FC<Props> = ({ first, second }) => {
  if (!second) return null;
  const diff = Diff.diffChars(encode(first), encode(second));

  const components = diff.map((part) => {
    const color = part.added ? "green" : part.removed ? "red" : "grey";
    return <span style={{ color }}>{decode(part.value)}</span>;
  });

  return <div className={style.root}>{components}</div>;
};
