import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { createMuiTheme, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { GridNotes } from './styles';
import { ThemeProvider } from 'styled-components';

const actionBunttons = createMuiTheme({
  palette: {
    primary: {
      main: '#676870'
    },
    secondary: {
      main: '#ff5f5f'
    }
  }
});

const Feed = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {

    const {
      userid, api
    } = props;
    axios.get(`${api}/api/noteuser/${userid}`)
      .then(res => {
        setData([...res.data]);
      }).catch(err => {
        console.log(err);
      })
  }, [data]);

  return (
    <GridNotes>
      {
        data.map(note => (
          <article>
            <div>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
            </div>
            <header>
              <ThemeProvider theme={actionBunttons}>
                <IconButton color='primary'>
                  <Edit />
                </IconButton>
                <IconButton color='secondary'>
                  <Delete />
                </IconButton>
              </ThemeProvider>
            </header>
          </article>
        ))
      }
    </GridNotes>
  );
};

export default Feed;