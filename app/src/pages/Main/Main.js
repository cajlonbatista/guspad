import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header/Header';
import { CircleLoading } from 'react-loadingg';
import Feed from '../../components/Feed/Feed';

const Main = props => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const url = process.env.REACT_APP_URL;
    const token = localStorage.getItem('@token');
    if (token === null) {
      setRedirect(true);
    } else {
      axios.get(`${url}/validate`, {
        headers: {
          'Authorization': token
        }
      }).then(async res => {
        const { ok, user } = res.data;
        if (ok !== true) {
          setRedirect(true);
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
        setRedirect(true);
      })
    }
  }, []);
  if (redirect) {
    return (
      <Redirect to='/login' />
    )
  }
  return (
    (loading === true)
      ?
      <CircleLoading color='#7E5DEA' />
      :
      <>
        <Header user={data} />
        <Feed user={data._id} />
      </>
  )
};

export default Main;