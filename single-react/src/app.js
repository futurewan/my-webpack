import React ,{Component} from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import './assets/css/style.less'


import AppRoutes from './routes/index';
(function () {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth > 980) {
        clientWidth = 980
    }
    const w = 75 * (clientWidth / 750);
    document.getElementsByTagName('html')[0].style.fontSize = w + 'px';
})();

class AppComponent extends Component {
    render(){
        return(
            <div>
                <AppRoutes/>
                {/* <Link to="/home">Home</Link>
                <Link to="/login">Login</Link> */}
            </div>
        )
    }
}

export default AppComponent;