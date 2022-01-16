import classNames from "classnames";
import React, { FC } from "react";
import { MenuModel, RouterModel } from "../models";

interface Props {
  model: MenuModel;
  router: RouterModel;
}
export const MenuView: FC<Props> = ({ model, router }) => {
  const items = model._items;

  return (
    <div>
      {items.length > 0 && (
        <ul className="menu__list">
          {items.map((i) => (
            <li
              className={classNames("menu__item", {
                menu__item_current: model.isCurrent(i.id),
                menu__item_target: model.isTarget(i.id),
              })}
              key={i.id}
              onClick={async () => {
                model.setTarget(i.routeNames[0]);
                router.push(i.routeNames[0]);
              }}
            >
              {i.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
