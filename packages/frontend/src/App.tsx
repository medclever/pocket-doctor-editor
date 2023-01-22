import { observer } from "mobx-react-lite";
import { rootModel } from "./rootModel";
import "./App.css";

export const App = observer(() => {
  const { $router } = rootModel.di;

  return (
    <div className="app">
      <div className="menu">{rootModel.getView("$menu")}</div>
      <div className="router">{$router.view}</div>
    </div>
  );
});

export default App;
