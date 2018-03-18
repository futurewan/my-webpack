import React from "react";
import { Carousel } from 'antd-mobile'

class BannerComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            data:[1,2,3,4,5]
        }
    }
    render() {
        return (
            <Carousel 
                autoplay={true}
                infinite={true}
            >
                {
                    this.state.data.map(val=>(
                        <a className="banner-a" key={val}>
                            <img src={require(`../../../assets/images/banner/banner${val}.jpg`)} alt="banner"/>
                        </a>
                    ))
                }
            </Carousel>
        );
    }
}

export default BannerComponent;
