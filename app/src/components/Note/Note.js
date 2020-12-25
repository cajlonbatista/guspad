import React, { useState } from 'react';

import { toggleRefresh } from "../../store/actions";
import { connect } from 'react-redux';
import axios from 'axios';

import { Close, More } from '@material-ui/icons';
import { Dropdown, Popconfirm, Menu } from 'antd';

import { ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core/styles';
import { NoteContainer, Color, DialogColor, DialogLabel } from './styles';
import { Chip, Dialog, IconButton, useMediaQuery } from '@material-ui/core';


const colors = ['#FFF', '#ffc849', '#FFFF6F', '#59C2A4', '#FF7272', '#d6d7ff', '#00F2EE'];

const Note = ({ note, refresh, dispatch }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [colorDialog, setColorDialog] = useState(false);
  const [labelDialog, setLabelDialog] = useState(false);
  const [label, setLabel] = useState("");
  const [labels, setLabels] = useState((note.labels === undefined) ? [] : note.labels);
  const [editable, setEditable] = useState(false);

  const url = process.env.REACT_APP_URL;

  const theme = useTheme();
  const fullNote = useMediaQuery(theme.breakpoints.down('sm'));



  const chipTheme = createMuiTheme({
    palette: {
      primary: {
        main: (note.color === undefined) ? '#FFF' : note.color,
        contrastText: "#303030",
      },
    },
    typography: {
      fontFamily: [
        'Inter'
      ].join(','),
      fontSize: 14
    },
  });


  const confirm = e => {
    axios.delete(`${url}/api/note/${note._id}`)
      .then(res => {
        dispatch(toggleRefresh(true))
      }).catch(err => {
        console.log(err);
      })
  }


  const cancel = e => { };

  const options = (
    colors.map(col => (
      <Color key={note.id} style={{ background: col }} onClick={async e => {
        await axios.put(`${url}/api/note/${note._id}`, {
          color: col
        }).then(res => {
          dispatch(toggleRefresh(true))
          offDialogColor();
        }).catch(err => console.log(err));
      }} />
    ))
  );

  const addLabels = async() => {
    var validate = "";
    for (const j of label) {
      if (j !== " ") {
        validate += j;
      }
    }
    if (validate !== "") {
      labels.push(label.toLocaleLowerCase());
      setLabels([...labels]);
      setLabel("");
      await axios.put(`${url}/api/note/${note._id}`, {
        labels: labels
      }).then(res => { 
        dispatch(toggleRefresh(true))
      })
        .catch(err => console.log(err));
    }
  };

  const refreshLabels = async () => {
    await axios.put(`${url}/api/note/${note._id}`, {
      labels: labels
    }).then(res => {
      dispatch(toggleRefresh(true))
    })
      .catch(err => console.log(err));
  }


  const onDialogColor = e => {
    setColorDialog(true);
  }
  const offDialogColor = e => {
    setColorDialog(false);
  }
  const onDialogLabel = e => {
    setLabelDialog(true);
  }
  const offDialogLabel = e => {
    setLabelDialog(false);
  }


  const menu = (
    <Menu>
      <Menu.Item onClick={onDialogColor}>
        <Color style={{ background: (note.color !== undefined) ? note.color : '#FFF' }} />
      </Menu.Item>
      <Menu.Item onClick={onDialogLabel}>
        Labels
      </Menu.Item>
      <Menu.Item danger>
        <Popconfirm
          title="Are you sure to delete this note?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <NoteContainer style={{ background: note.color }} >
      <span
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onClick={e => setEditable(true)}
        onChange={e => setTitle(e.target.value)}
        onFocus={e => dispatch(toggleRefresh(false))}
        onBlur={async e => {
          setEditable(false);
          await axios.put(`${url}/api/note/${note._id}`, {
            title: title
          })
            .then(res => {
            }).catch(err => {
              console.log(err);
            })
          dispatch(toggleRefresh(true))
        }} >
        {title}
      </span>
      <Dialog open={colorDialog} onClose={offDialogColor}>
        <DialogColor>
          {
            options
          }
        </DialogColor>
      </Dialog>
      <Dialog fullScreen={fullNote} open={labelDialog} onClose={offDialogLabel}>
        <ThemeProvider theme={chipTheme}>
          <DialogLabel>
            <article>
              <header>
                <label htmlFor="labels">{note.title}</label>
                <IconButton onClick={offDialogLabel}>
                  <Close style={{ color: 'white'}}/>
                </IconButton>
              </header>
              <div>
                <input
                  name="labels"
                  title=""
                  autoComplete="off"
                  value={label}
                  onChange={e => {
                    setLabel(e.target.value);
                  }}
                />
                <IconButton type='button' title="Add label" onClick={addLabels}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill='#404040' d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  </svg>
                </IconButton>
              </div>
            </article>
            <article>
              {labels.map((tag) => (
                <Chip
                  color="primary"
                  onDelete={e => {
                    labels.splice(labels.indexOf(tag), 1);
                    setLabels([...labels]);
                    refreshLabels();
                  }}
                  key={tag}
                  label={tag}
                />
              ))}
            </article>
          </DialogLabel>
        </ThemeProvider>
      </Dialog>
      <Dropdown overlay={menu} trigger={['click']}>
        <More />
      </Dropdown>
      <span
        contentEditable={editable}
        spellcheck="false"
        suppressContentEditableWarning={true}
        onClick={e => setEditable(true)}
        onChange={e => setContent(e.target.value)}
        nFocus={e => dispatch(toggleRefresh(false))}
        onBlur={async e => {
          setEditable(false);
          await axios.put(`${url}/api/note/${note._id}`, {
            content: content
          })
            .then(res => {
            }).catch(err => {
              console.log(err);
            })
          dispatch(toggleRefresh(true))
        }}>
        {content}
      </span>
      <article>
        {
          new Date(note.publishedAt).toLocaleDateString()
        }
      </article>
    </NoteContainer>
  );
};

export default connect(state => ({ refresh: state.refresh }))(Note);
