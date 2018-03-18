import React from 'react';
import { connect } from 'react-redux';

import HomeHeaderComponent from './homeHeader';
import MenuComponent from './menu';
import BannerComponent from './banner';
class HomeComponent extends React.Component{
    render(){
        return(
            <div>
                <HomeHeaderComponent/>
                <MenuComponent/>
                <BannerComponent/>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({

})

const mapDispatchToProps = (dispatch)=>({
    saleList:()=>{
    }
})
export default connect(null,mapDispatchToProps)(HomeComponent);