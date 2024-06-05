import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber";

const Main = () => {
    return (
        <div className="mx-auto max-w-7xl">
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;