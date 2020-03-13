import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';

class Header extends Component {

    componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }

    render(){
        return (
            <div>
                <nav>
                    <div className="nav-wrapper red darken-3">
                        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <div style={{paddingLeft: '15px'}}>
                            <Link to={'/'} className="brand-logo">Poof!</Link>
                        </div>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to={'/shop'}>Shop</Link></li>
                                <li><Link to={'/about'}>About Us</Link></li>
                                <li><Modal /></li>
                                <li><Modal2 /></li>
                            </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li style={{textAlign: "center"}}><Link to={'/shop'}>Shop</Link></li>
                    <li style={{textAlign: "center"}}><Link to={'/about'}>About Us</Link></li>
                    <li><Modal /></li>
                    <li><Modal2 /></li>
                </ul>
            </div>
            
        )
    }
}


export default Header;