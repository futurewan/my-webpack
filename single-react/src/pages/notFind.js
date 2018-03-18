import React from 'react';
import {Link} from 'react-router-dom'

class NotFind extends React.Component{
    render(){
        return(
            <div>
                not find<br/>
                <Link to="/home">Home</Link>
            </div>
        )
    }
}


export default NotFind;