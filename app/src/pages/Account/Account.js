import React, { useEffect, useState } from 'react';

import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from '../../components/Header/Header';
import { toggleAuth } from '../../store/actions';
import { CircleLoading } from 'react-loadingg';
import { Edit } from '@material-ui/icons';

import { AccountContainer } from './styles';

const Account = ({ auth, dispatch }) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [base, setBase] = useState('');
  
  useEffect(() => {
    if (auth.email === undefined) {
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
            axios.get(`${url}/api/user/${user}`)
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
        <AccountContainer>
          <header>
            <div style={{ backgroundImage: `url(${(base === '') ? ((data.avatar === undefined) ? 'https://c1.wallpaperflare.com/preview/811/367/789/technology-computer-creative-design.jpg' : data.avatar) : base})` }}>
              <Edit style={{ color: 'white' }} />
              <input type='file' title={data.username}/>
            </div>
            <h1>{data.username}</h1>
          </header>
          <section>
            <p>{data.email}</p>
            <button onClick={async e => {
              await localStorage.setItem('@token', null);
              setRedirect(true);
            }}>Loggout</button>
          </section>
        </AccountContainer>
      </>
  )
};

export default connect(state => ({ refresh: state.refresh, auth: state.auth }))(Account);