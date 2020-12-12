import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Spin, message } from 'antd';

import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { LoginContainer } from '../styles/auth.styles';
import { login } from '../themes/themes';
import { useState } from 'react';

const Login = (props) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const onCreate = e => {
    e.preventDefault();
    const data = {
      email,
      password,
      username
    }
    setLoading(true);
    axios.post(`${props.url}/api/verify`, {
      email
    }).then(res => {
      if (res.data.ok === true) {
        axios.post(`${props.url}/api/register`, data)
          .then(res => {
            setLoading(false);
            const { token } = res.data;
            localStorage.setItem('@token', `Bearer ${token}`);
            router.push('/');
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

  return (
    <ThemeProvider theme={login}>
      <Head>
        <title>Register | Guspad</title>
        <link rel="icon" href={require('../assets/post.svg')} />
      </Head>
      <LoginContainer>
        <header>
          <img src={require('../assets/post.svg')} />
          <Link href='/login'>Login</Link>
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
      </LoginContainer>
    </ThemeProvider>
  );
};

export default Login;

export async function getStaticProps() {
  return {
    props: {
      url: process.env.API_URL,
    }
  }
}
