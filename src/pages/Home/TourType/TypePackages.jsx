import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import SingleTypePackage from './SingleTypePackage';

const TypePackages = () => {

    const types = useLoaderData();
    console.log(types);

    return (
        <div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-y-5 py-24 px-12 gap-8 ">
                {
                    types?.slice(0, 3).map(spot => <SingleTypePackage
                        key={spot._id}
                        spot={spot}
                    ></SingleTypePackage>)
                }
            </div>
            <div className="pb-10 ml-[50%] border-3">
                <Link to='/allpackages'><button className="btn btn-outline mx-auto">All Packages</button></Link>
            </div>
        </div>
    );
};

export default TypePackages;