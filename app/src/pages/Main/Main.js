import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header/Header';
import { CircleLoading } from 'react-loadingg';
import Feed from '../../components/Feed/Feed';
import { connect } from 'react-redux';
import { toggleAuth } from '../../store/actions';

const Main = ({ auth, dispatch }) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (auth.email === undefined ) {
      setLoading(true);
      const url = process.env.REACT_APP_URL;
      const token = localStorage.getItem('@token');
      if (token === null) {
        setRedirect(true);
      } else {
        axios.get(`${url}validate`, {
          headers: {
            'Authorization': token
          }
        }).then(async res => {
          const { ok, user } = res.data;
          if (ok !== true) {
            setRedirect(true);
          } else {
            axios.get(`${url}api/user/${user}`)
              .then(async res => {
                setData(res.data);
                await dispatch(toggleAuth(res.data));
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
    } else {
      setData(auth);
      setLoading(false);
    }
  }, [data]);

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
        <Feed/>
      </>
  )
};

export default connect(state => ({ refresh: state.refresh, auth: state.auth }))(Main);