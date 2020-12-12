import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import { message, Spin } from 'antd';

import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { LoginContainer } from '../styles/auth.styles';
import { login } from '../themes/themes';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const { url } = props;

    const token = localStorage.getItem('@token');
    if (token === null) {
      router.push('/login');
    } else {
      axios.get(`${url}/validate`, {
        headers: {
          'Authorization': token
        }
      }).then(async res => {
        const { ok, user } = res.data;
        if (ok === true) {
          router.push('/');
        } else {
          setLoading(false);
        }
      }).catch(err => {
        console.log(err.message);
      })
    }
  }, []);

  const onLogin = e => {
    e.preventDefault();
    setLoading(true);
    const { url } = props;
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
          router.push('/');
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

  return (
    <ThemeProvider theme={login}>
      <Head>
        <title>Login | Guspad</title>
        <link rel="icon" href={require('../assets/post.svg')} />
        < link rel='manifest' href='/manifest.json' />
      </Head>
      <LoginContainer>
        <header>
          <img src={require('../assets/post.svg')} />
          <Link href='/register'>Register</Link>
        </header>
        <form onSubmit={onLogin}>
          <div>
            <label>Email</label>
            <input required type='email' value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password</label>
            <input required type='password' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <Button type='submit'><Spin spinning={loading}>Login</Spin></Button>
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