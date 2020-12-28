import React, { useState } from 'react';

import axios from 'axios';

import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Spin, message } from 'antd';

import { ThemeProvider } from '@material-ui/core/styles';
import { AuthContainer } from '../Login/styles';
import { login } from '../../themes/themes';

import logo from '../../global/assets/post.svg';

const Login = props => {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_URL;

  const onCreate = e => {
    e.preventDefault();
    const data = {
      email: email.toLocaleLowerCase(),
      password,
      username
    }
    setLoading(true);
    axios.post(`${url}/api/verify`, {
      email: email.toLocaleLowerCase()
    }).then(res => {
      if (res.data.ok === true) {
        axios.post(`${url}/api/register`, data)
          .then(res => {
            setLoading(false);
            const { token } = res.data;
            localStorage.setItem('@token', `Bearer ${token}`);
            setRedirect(true);
          })
          .catch(err => {
            message.error(`${err.message}`);
          });
      } else {
        message.warn('Email is already registered !');
        setLoading(false);
      }
    }).catch(err => {
      console.log(err)
      setLoading(false);
      message.warn(err);
    });
  }
  if (redirect === true) {
    return <Redirect to='/'/>
  }
  return (
    <ThemeProvider theme={login}>
      <AuthContainer>
        <header>
          <img src={logo} alt='Guspad' />
          <Link to='/login'>Login</Link>
        </header>
        <form onSubmit={onCreate}>
          <div>
            <label>Username</label>
            <input required type='text' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input required type='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input required type='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button type='submit'><Spin spinning={loading}>Register</Spin></Button>
        </form>
      </AuthContainer>
    </ThemeProvider>
  );
};

export default Login;
