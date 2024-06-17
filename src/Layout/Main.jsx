import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber";
import Footer from "../Shared/Footer";

const Main = () => {
    return (
        <div>
            <div className="mx-auto max-w-7xl">
                <Navber></Navber>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;