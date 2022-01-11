import {Fragment} from "react";

import CartIcon from "./cartbutton";
import allmeals from '../../assets/meals.jpg';
import classes from './header.module.css';

const Header = (props) => {
    return (<Fragment>
        <header className={classes.header}>
            <h1>Mealer App</h1>
            <CartIcon onClick = {props.show}></CartIcon>
        </header>
        <div className={classes['.main-image']}>
            <img src={allmeals}></img>
        </div>
    </Fragment>)
};

export default Header;