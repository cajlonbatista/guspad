import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Button, createMuiTheme, Dialog, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { Spin } from 'antd';

import { GridNotes } from './styles';
import { ThemeProvider } from 'styled-components';
import { MakerForm } from '../Maker/styles';

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
  const [editDialog, setEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ntitle, setTitle] = useState(null);
  const [ncontent, setContent] = useState(null);

  const {
    api
  } = props;

  useEffect(() => {
    let {
      userid, api
    } = props;
    axios.get(`${api}/api/noteuser/${userid}`)
      .then(res => {
        setData([...res.data]);
      }).catch(err => {
        console.log(err);
      })
  }, [data]);

  const offEditDialog = e => {
    setEditDialog(false);
  }
  const onEditDialog = e => {
    setEditDialog(true);
  }
  const putNote = (e, noteid, content, title) => {
    e.preventDefault();
    setLoading(true);

    axios.put(`${api}/api/note/${noteid}`, {
      title: ((ntitle == null) ? title : ntitle ),
      content: ((ncontent == null) ? content : ncontent),
    }).then(res => {
      setLoading(false);
      offEditDialog();
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <GridNotes>
      {
        data.map(note => {
          return (
            <article key={note._id}>
              <div>
                <h1>{note.title}</h1>
                <p>{note.content}</p>
              </div>
              <header>
                <ThemeProvider theme={actionBunttons}>
                  <IconButton color='primary' onClick={onEditDialog}>
                    <Edit />
                  </IconButton>
                  <IconButton color='secondary'>
                    <Delete />
                  </IconButton>
                </ThemeProvider>
              </header>
              <Dialog open={editDialog} onClose={offEditDialog} fullScreen >
                <MakerForm onSubmit={putNote}>
                  <div>
                    <input type='text' required placeholder='Title' value={(ntitle == null) ? note.title : ntitle} onChange={e => {
                      setTitle(e.target.value);
                    }} />
                  </div>
                  <div>
                    <textarea type='text' required placeholder='Content' value={(ncontent == null) ? note.content : ncontent} onChange={e => {
                      setContent(e.target.value);
                    }}></textarea>
                  </div>
                  {
                    (ntitle == null && ncontent == null)
                      ?
                      <Button onClick={offEditDialog}>Close</Button>
                      :
                      <div style={{ display: 'flex'}}>
                        <Button type='submit' onClick={e => {
                          putNote(e, note._id, note.content, note.title);
                        }}><Spin spinning={loading}>Update</Spin></Button>
                        <Button onClick={offEditDialog}>Close</Button>
                      </div>
                  }
                </MakerForm>
              </Dialog>
            </article>
          )
        })
      }

    </GridNotes>
  );
};

export default Feed;