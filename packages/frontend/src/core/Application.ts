import React from "react";

import { DIDefault } from "./types";
import { BaseModel, MenuModel, RouterModel } from "./models";
import { LoadingView, ErrorView } from "./views";
import { MenuView } from "./views/MenuView";
import { Event } from "./events";

export class Application<DIType extends DIDefault> {
  private models: Map<string, BaseModel> = new Map();
  private views: Map<string, any> = new Map();
  private event = new Event();

  constructor() {
    this.model("$router", new RouterModel(this));
    this.modelView("$menu", new MenuModel(), MenuView);
    this.view("$loading", LoadingView);
    this.view("$error", ErrorView);
  }

  getModelByName(name: string) {
    return this.models.get(name);
  }

  getViewByName(name: string) {
    return this.views.get(name);
  }

  model(name: string, model: BaseModel) {
    if (!this.models.has(name)) {
      model.setEvent(this.event);
      model.init();
      this.models.set(name, model);
    }

    return this;
  }

  view(name: string, view: any) {
    if (!this.views.has(name)) {
      this.views.set(name, view);
    }

    return this;
  }

  modelView(name: string, model: BaseModel, view: any) {
    this.model(name, model);
    this.view(name, view);

    return this;
  }

  menu(): MenuModel {
    return this.models.get("$menu") as MenuModel ?? new MenuModel();
  }

  getView(name: string): React.ReactElement | null {
    const view = this.getViewByName(name);
    const model = this.getModelByName(name);
    const router = this.getModelByName("$router");
    if (!model || !view) return null;

    return React.createElement(view, { model, router });
  }

  get di(): DIType {
      var handler = {
          get: function(target: Application<DIType>, name: any){
              return target.models.has(name)?
                  target.models.get(name) :
                  undefined;
          }
      };
      
      return new Proxy(this, handler) as any as DIType;
  }
}

