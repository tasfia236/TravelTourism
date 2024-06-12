import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Overview from './OverView/Overview';
import Packages from './Packages/Packages';

const Tourism = () => {
    return (
        <div className='mx-auto m-5 text-center'>
            <h1 className="font-black text-sky-600 text-4xl py-10"> Tourism And Travel Guide</h1>
            <Tabs>
                <TabList className='font-bold text-orange-500'>
                    <Tab>Overview</Tab>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    <Overview></Overview>
                </TabPanel>
                <TabPanel>
                    <Packages></Packages>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Tourism;