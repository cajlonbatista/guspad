import React, { forwardRef, useState } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';

import { Button, Dialog, DialogContent, IconButton, Slide, useMediaQuery } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core/styles';
import { AddBox, Close } from '@material-ui/icons';

import { MakerContainer, MakerForm } from './styles';
import { toggleRefresh } from '../../store/actions';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const dialog = createMuiTheme({
  pallete: {
    primary: {
      main: 'red'
    },
    secondary: {
      main: 'red'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightBold: 600,
  }
});


const Maker = ({ user, refresh, dispatch }) => {
  const api = process.env.REACT_APP_URL;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const offDialog = e => {
    setOpen(false);
  }
  const onDialog = e => {
    setOpen(true);
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const createNote = e => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${api}api/note`, {
      title,
      user,
      content
    }).then(res => {
      setLoading(false);
      setOpen(false);
      setTitle('');
      setContent('');
      dispatch(toggleRefresh(true));
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <ThemeProvider theme={dialog}>
      <MakerContainer>
        <IconButton onClick={onDialog}><AddBox style={{ fontSize: 20 }} /></IconButton>
      </MakerContainer>
      <Dialog fullScreen={fullScreen} open={open} onClose={offDialog} TransitionComponent={Transition}>
        <DialogContent style={{ position: 'relative', overflow: 'hidden' }}>
          <MakerForm onSubmit={createNote}>
            <header>
              <span>New note</span>
              <IconButton edge="start" color="inherit" onClick={offDialog} aria-label="close">
                <Close style={{ color: '#7E5DEA' }} />
              </IconButton>
            </header>
            <section>
              <div>
                <input type='text' required placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <textarea type='text' required placeholder='Content' value={content} onChange={e => setContent(e.target.value)}></textarea>
              </div>
              <Button type='submit'>
                {
                  (loading)
                    ?
                    <>Add...</>
                    :
                    <>Add</>
                }
              </Button>
            </section>
          </MakerForm>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default connect(state => ({ refresh: state.refresh }))(Maker);
