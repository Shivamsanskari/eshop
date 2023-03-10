import React, { useEffect, useState } from 'react';
import styles from "./Header.module.scss";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/config';

import { toast } from 'react-toastify';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';

import { useDispatch } from 'react-redux';

import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyRoutes/AdminOnlyRoute';


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">Cart <FaShoppingCart size={20} style={{ marginLeft: "3px" }} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")


const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Monitor currently signedIn User

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName === null) {
          let index = (user.email).indexOf('@');
          let extractedName = user.email.substring(0, index);
          let capitalizedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
          setdisplayName(capitalizedName);
        }
        else {
          setdisplayName(user.displayName);
        }
        dispatch(SET_ACTIVE_USER({
          isLoggedIn: true,
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        }))

      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch,displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logged out successfully");
      navigate('/');
    }).catch((error) => {
      toast.error(error.message);
    });
  }

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          {logo}
        </div>
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={20} color="#fff" onClick={hideMenu} />
            </li>
            <AdminOnlyLink>
              <li>
                <Link to={'/admin/home'}>
                  <button className='--btn --btn-primary'>Admin Dashboard</button>
                </Link>
              </li>
            </AdminOnlyLink>
            <li>
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>

              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home"><FaUserCircle size={16} style={{ marginBottom: "-3px" }} /><span>Hi {displayName}</span></a>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="/register" className={activeLink}>Register</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>

            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
