import React from "react";

import { Header, Footer, SidePanel } from '../commons';



const Home = () => {
    return (
        <div>
            <Header />
            <div className="ui two column centered grid" style={{ marginTop: '100px' }}>

                <div className="ui row">
                    <div className="four wide column">
                         <SidePanel />
                    </div>
                    <div className="twelve wide column" style={{ paddingRight: '200px' }}>
                        <div className="ui raised segment">
                            
                        </div>
                    </div>
                <Footer />
                </div>

            </div>
        </div>
    )
};

export default Home;