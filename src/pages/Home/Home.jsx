import Banner from "../../Shared/Banner";
import TourType from "./TourType/TourType";
import Tourism from "./TourismGuide/Tourism";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Tourism></Tourism>
            <TourType></TourType>
        </div>
    );
};

export default Home;