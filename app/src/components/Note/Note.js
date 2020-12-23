import React, { useState } from 'react';

import { toggleRefresh } from "../../store/actions";
import { connect } from 'react-redux';
import axios from 'axios';

import { IconButton } from '@material-ui/core';
import { More } from '@material-ui/icons';

import { NoteContainer } from './styles';

const Note = ({ note, refresh, dispatch }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const url = process.env.REACT_APP_URL;

  return (
    <NoteContainer>
      <More />
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onFocus={e => dispatch(toggleRefresh(false))}
        onBlur={async e => {
          await axios.put(`${url}/api/note/${note._id}`, {
            title: title
          })
            .then(res => {
            }).catch(err => {
              console.log(err);
            })
          dispatch(toggleRefresh(true))
        }} />
      <div
        contentEditable
        suppressContentEditableWarning={true}
        onChange={e => setContent(e.target.value)}
        nFocus={e => dispatch(toggleRefresh(false))} onBlur={async e => {
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
      </div>
      <span>
        {
          new Date(note.publishedAt).toLocaleDateString()
        }
      </span>
    </NoteContainer>
  );
};

export default connect(state => ({ refresh: state.refresh }))(Note);
