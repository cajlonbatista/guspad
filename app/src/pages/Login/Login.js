import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import CircleLoading from 'react-loadingg/lib/CircleLoading';
import { Button } from '@material-ui/core';
import { message, Spin } from 'antd';

import { ThemeProvider } from '@material-ui/core/styles';
import { login } from '../../themes/themes';
import { AuthContainer } from './styles';

import logo from '../../global/assets/post.svg';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(true);
  const url = process.env.REACT_APP_URL;
  
  useEffect(() => {
    const token = localStorage.getItem('@token');
    if (token === null) {
      setLoader(false);
    } else {
      axios.get(`${url}/validate`, {
        headers: {
          'Authorization': token
        }
      }).then(async res => {
        const { ok } = res.data;
        if (ok === true) {
          setRedirect(true);
        } else {
          setLoader(false);
        }
      }).catch(err => {
        console.log(err.message);
      })
    }
  }, [url]);

  const onLogin = e => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${url}/api/verify`, {
      email
    }).then(res => {
      if (res.data.ok === false) {
        axios.post(`${url}/api/login`, {
          email,
          password
        }).then(res => {
          setLoading(false);
          const { token } = res.data;
          localStorage.setItem('@token', `Bearer ${token}`);
          setRedirect(true);
        }).catch(err => {
          message.warn(`Incorrect password !`);
          setLoading(false);
        })
      } else {
        message.warn('Email is not registered !');
        setLoading(false);
      }
    }).catch(err => console.log(err));
  }
  if (redirect === true) {
    return (
      <Redirect to='/' />
    );
  }
  return (
    (loader === true)
      ?
      <CircleLoading color='#7E5DEA'/>
      :
      <ThemeProvider theme={login}>
        <AuthContainer>
          <header>
            <img src={logo} alt='Guspad' />
            <Link to='/register'>Register</Link>
          </header>
          <form onSubmit={onLogin}>
            <div>
              <label>Email</label>
              <input required type='email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input required type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type='submit'><Spin spinning={loading}>Login</Spin></Button>
          </form>
        </AuthContainer>
      </ThemeProvider>
  );
};

export default Login;
