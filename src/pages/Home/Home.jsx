import Banner from "../../Shared/Banner";
import TourType from "./TourType/TourType";
import Tourism from "./TourismGuide/Tourism";
import TouristStories from "./TouristStories/TouristStories";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Tourism></Tourism>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <TourType></TourType>
            </motion.h1>
            <TouristStories></TouristStories>
        </div>
    );
};

export default Home;