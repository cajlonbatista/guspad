import React, { forwardRef, useState } from 'react';

import { AddBox, Close } from '@material-ui/icons';
import { AppBar, Button, Dialog, IconButton, Slide, Toolbar } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { MakerContainer, MakerForm } from './styles';
import { Spin } from 'antd';

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


const Maker = (props) => {
  const {

  } = props;

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

  return (
    <ThemeProvider theme={dialog}>
      <MakerContainer>
        <IconButton onClick={onDialog}><AddBox /></IconButton>
      </MakerContainer>
      <Dialog fullScreen open={open} onClose={offDialog} TransitionComponent={Transition}>
        <AppBar color='primary'>
          <Toolbar style={{ boxShadow: 'none', background: '#7E5DEA', display: 'flex', justifyContent: 'center', position: "block" }}>
            <IconButton edge="start" color="inherit" onClick={offDialog} aria-label="close">
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <MakerForm>
          <div>
            <label>Title</label>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Content</label>
            <textarea type='text' value={content} onChange={e => setContent(e.target.value)}></textarea>
          </div>
          <Button type='submit'><Spin spinning={loading}>Maker</Spin></Button>
        </MakerForm>
      </Dialog>
    </ThemeProvider>
  );
};

export default Maker;