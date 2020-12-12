import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';

import axios from 'axios';

import Header from '../components/Header/Header';
import Maker from '../components/Maker/Maker';
import Feed from '../components/Feed/Feed';
import { CircleLoading } from 'react-loadingg';

import { Fixed } from '../styles/index.styles';


export default function Home(props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [notes, setNotes] = useState();

  useEffect(() => {
    let { url } = props;
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
        if (ok !== true) {
          router.push('/login');
        } else {
          axios.get(`${url}/api/user/${user}`)
            .then(async res => {
              await setData(res.data);
              setLoading(false);
            }).catch(err => {
              console.log(err);
              setLoading(false);
            });
        }
      }).catch(err => {
        console.log(err.message);
        router.push('/login');
      })
    }
  }, []);

  const { url } = props;

  if (loading === true) {
    return (
      <>
        <Head>
          <title>Guspad</title>
          <link rel="icon" href={require('../assets/post.svg')} />
        </Head>
        <CircleLoading />
      </>
    )
  } else {
    return (
      <div>
        <Head>
          <title>Guspad</title>
          <link rel="icon" href={require('../assets/post.svg')} />
        </Head>
        <Header user={data} url={url} />
        <Feed userid={data._id} api={url}/> 
      </div>
    )
  }
}

export async function getStaticProps() {
  return {
    props: {
      url: process.env.API_URL,
    }
  }
}