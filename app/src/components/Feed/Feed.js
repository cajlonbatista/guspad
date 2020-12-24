import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { toggleRefresh } from '../../store/actions';

import Note from '../Note/Note';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { GridFeed } from './styles';

const Feed = ({ refresh, dispatch, user }) => {
  const url = process.env.REACT_APP_URL;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [label, setLabel] = useState('');
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

  useEffect(() => {
    axios.post(`${url}/api/note/search`, {
      user: user,
      label: label
    })
      .then(res => {
        setSearch([...res.data]);
        setLoading(false);
      }).catch(err => console.log(err));
  }, [label, url, user, refresh]);

  return (
    (loading === true)
      ?
      <></>
      :
      <GridFeed>
        <header>
          <input placeholder='Search labels' value={label} onChange={e => setLabel(e.target.value)} />
        </header>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1400: 4 }}>
          <Masonry>
            {
              (search.length === 0)
                ?
                data.map(note => (
                  <Note key={note._id} note={note} />
                ))
                :
                search.map(note => (
                  <Note key={note._id} note={note} />
                ))
            }
          </Masonry>
        </ResponsiveMasonry>
      </GridFeed>
  );
};

export default connect(state => ({ refresh: state.refresh }))(Feed);