import styled from 'styled-components';

export const NoteContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #cfd0f7;
  position: relative;
  border-radius: 5px;
  input{
    font-family: Poppins, sans-serif;
    font-size: 16px;
    color: #404040;
    font-weight: 600;
  }
  div{
    font-family: Nunito, sans-serif;
    font-size: 14px;
  }
  input, div{
    border: 1.3px solid transparent;
    padding: 5px;
    outline: none;
    background: transparent;
    resize: none;
  }
  span{
    font-size: 11px;
    font-family: Nunito, sans-serif;
  }
  svg{
    position: absolute;
    top: 0;
    right: 0;
    width: 23px;
    cursor: pointer;
    :hover{
      fill: #cfd0f7;
      stroke: #404040;
    }
  }
`;