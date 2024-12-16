import Dashboard from "../Dashboard";
import CreateMenu from "./userMenus";


const ItemTool = () => {
  return (
    <div>
        <Dashboard leftPanelContent={<CreateMenu/>} />
    </div>
  );
};

export default ItemTool;
