import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { toggleRefresh } from '../../store/actions';

import Note from '../Note/Note';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Close } from '@material-ui/icons';

import { GridFeed, NotFoundSearch, Searching, Bounce } from './styles';

import notfound from '../../global/assets/notfound.svg';

const Feed = ({ refresh, dispatch, auth }) => {

  const url = process.env.REACT_APP_URL;

  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(true);
  const [close, setClose] = useState('none');

  useEffect(() => {
    if (refresh === true) {
      axios.get(`${url}/api/noteuser/${auth._id}`)
        .then(res => {
          setData([...res.data]);
          setLoading(false);
          dispatch(toggleRefresh(false));
          console.log();
        })
    }
  }, [refresh]);

  useEffect(() => {
    axios.get(`${url}/api/noteuser/${auth._id}`)
      .then(res => {
        setData([...res.data]);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    if (label !== '') {
      setClose('block');
    } else {
      setClose('none');
    }
    axios.post(`${url}/api/note/search`, {
      user: auth._id,
      label: label
    })
      .then(res => {
        setSearch([...res.data]);
        setLoading(false);
      }).catch(err => console.log(err));
  }, [label, url, refresh]); 

  return (
    (loading === true)
      ?
      <></>
      :
      <React.Fragment>
        <Searching onSubmit={e => {
          e.preventDefault()
        }}>
          {
            (search.length !== 0)
              ?
              <h1>Results</h1>
              :
              <h1>Notes</h1>
          }
          <div>
            <input placeholder='Search labels' value={label} onChange={e => setLabel(e.target.value)} />
            <Close style={{ display: close }} onClick={e => setLabel('')} />
          </div>
        </Searching>
        <GridFeed>
          {
            (search.length === 0 && label === '')
              ?
              <Bounce>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1400: 4 }}>
                  <Masonry>
                    {
                      data.map(note => (
                        <Note key={note._id} note={note} />
                      ))
                    }
                  </Masonry>
                </ResponsiveMasonry>
              </Bounce>
              :
              (search.length === 0)
                ?
                <Bounce>
                  <NotFoundSearch>
                    <img src={notfound} alt='Not Found' />
                  </NotFoundSearch>
                </Bounce>
                :
                <Bounce>
                  <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1400: 4 }}>
                    <Masonry>
                      {
                        search.map(note => (
                          <Note key={note._id} note={note} />
                        ))
                      }
                    </Masonry>
                  </ResponsiveMasonry>
                </Bounce>
          }
        </GridFeed>
      </React.Fragment>
  );
};

export default connect(state => ({ refresh: state.refresh, auth: state.auth }))(Feed);