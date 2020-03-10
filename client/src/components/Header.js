import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => 
    (
        <nav>
            <div className="nav-wrapper red darken-3">
                <div style={{paddingLeft: '15px'}}>
                    <Link to={'/'} className="brand-logo">Poof!</Link>
                </div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to={'/shop'}>Shop</Link></li>
                        <li><Link to={'/about'}>About Us</Link></li>
                    </ul>
            </div>
        </nav>
    )


export default Header;