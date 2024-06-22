import Banner from "../../Shared/Banner";
import TourType from "./TourType/TourType";
import Tourism from "./TourismGuide/Tourism";
import TouristStories from "./TouristStories/TouristStories";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Tourism></Tourism>
            <TourType></TourType>
            <TouristStories></TouristStories>
        </div>
    );
};

export default Home;