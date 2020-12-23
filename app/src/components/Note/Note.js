import React, { useState } from 'react';

import { toggleRefresh } from "../../store/actions";
import { connect } from 'react-redux';
import axios from 'axios';

import { More } from '@material-ui/icons';
import { Dropdown, Popconfirm, Menu } from 'antd';

import { NoteContainer } from './styles';

const Note = ({ note, refresh, dispatch }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const url = process.env.REACT_APP_URL;

  const confirm = e => {
    axios.delete(`${url}/api/note/${note._id}`)
      .then(res => {
        dispatch(toggleRefresh(true))
      }).catch(err => {
        console.log(err);
      })
  }

  const cancel = e => { };

  const menu = (
    <Menu>

      <Menu.Item danger>
        <Popconfirm
          title="Are you sure to delete this note?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          Remove
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <NoteContainer>
      <Dropdown overlay={menu}>
        <More />
      </Dropdown>
      <input
        value={title}
        spellcheck="false"
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
        spellcheck="false"
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
