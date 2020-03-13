import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Sidenav extends Component {
    componentDidMount(){
        M.Sidenav.init(this.Sidenav);
    }

    render() {
        return (

        <div
            ref={Sidenav => {
                this.Sidenav = Sidenav;}}
            id="sidenav1"
            className="sidenav" >

            <nav>
                <div className="nav-wrapper red darken-3">
                    <div style={{paddingLeft: '15px'}}>
                        <Link to={'/'} className="brand-logo">Poof!</Link>
                        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    </div>
                        <ul>
                            <li><Link to={'/shop'}>Shop</Link></li>
                            <li><Link to={'/about'}>About Us</Link></li>
                            <li><Modal /></li>
                            <li><Modal2 /></li>
                        </ul>
                </div>

                <ul class="sidenav" id="mobile-demo">
                    <li><Link to={'/shop'}>Shop</Link></li>
                    <li><Link to={'/about'}>About Us</Link></li>
                    <li><Modal /></li>
                    <li><Modal2 /></li>
                </ul>
            </nav>
        </div>

        )
    }
}

export default Sidenav;

