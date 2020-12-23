import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { toggleRefresh } from '../../store/actions';

import Note from '../Note/Note';

import { GridFeed } from './styles';

const Feed = ({ refresh, dispatch, user }) => {
  const url = process.env.REACT_APP_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (refresh === true) {
      axios.get(`${url}/api/noteuser/${user}`)
        .then(res => {
          setData([...res.data]);
          setLoading(false);
          dispatch(toggleRefresh(false));
        })
    }
  }, [refresh, url, user]);

  useEffect(() => {
    axios.get(`${url}/api/noteuser/${user}`)
      .then(res => {
        setData([...res.data]);
        setLoading(false);
      })
  }, []);

  return (
    (loading === true)
      ?
      <div>
      </div>
      :
      <GridFeed>
        {
          data.map(note => (
            <Note key={note._id} note={note}/>
          ))
        }
      </GridFeed>
  );
};

export default connect(state => ({ refresh: state.refresh }))(Feed);