import { Application, DIDefault } from "./core";
import { ArticleItemModel, ArticleListModel } from "./models";
import { ImageListModel } from "./models/ImageListModel";
import { ArticleItemView, ArticleListView } from "./views";
import { ImageListView } from "./views/ImageListView";

export interface DI extends DIDefault {}
export const rootModel = new Application<DI>();
export enum r {
  "articleList" = "articleList",
  "articleItem" = "articleItem",
  "imageList" = "imageList",
}

rootModel
  .modelView(r.articleList, new ArticleListModel(), ArticleListView)
  .modelView(r.imageList, new ImageListModel(), ImageListView)
  .modelView(r.articleItem, new ArticleItemModel(), ArticleItemView);

rootModel.menu().item("Articles", [r.articleList, r.articleItem]);
rootModel.menu().item("Images", [r.imageList]);
