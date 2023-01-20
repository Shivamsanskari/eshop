import React, { useState } from 'react';
import styles from './auth.module.scss';
import loginImg from '../../assets/login.png';
import Card from "../../components/card/Card";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';

import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Login with Email and Password...
    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false);
                toast.success("Login successful...");
                setTimeout(() => {
                    navigate('/');
                }, 2000)
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false);
            });
    }

    // Login with google...
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setIsLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                setIsLoading(false);
                toast.success("Login Successful");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="loginimg" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <form onSubmit={loginUser}>
                            <input type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='--btn --btn-primary --btn-block'>Login</button>
                            <div className={styles.links}>
                                <Link to="/reset">Reset Password</Link>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle} ><FaGoogle color='#fff' className='--mr' />  Login With Google</button>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login