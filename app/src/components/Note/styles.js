import styled from 'styled-components';

export const NoteContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  border-radius: 5px;
  
  margin: 10px;

  span:first-child{
    font-family: Poppins, sans-serif;
    font-size: 16px;
    color: #000000;
    font-weight: 600;
    background: transparent!important;
  }
  span{
    font-family: Nunito, sans-serif;
    font-size: 14px;
    img, button, svg,form, section, article{
      display: none!important;
    }
    div{
      all: unset;
      all: revert;
    }
    p, h1, h2, h3, h4, h6, span, strong, div {
      background-color: transparent;
      font-family: Nunito, sans-serif;
      font-size: 14px;
    }
    background-color: transparent;
  }
  span:first-child{
    div{
      display: none;
    }
  }
  input, >span{
    border: 1.3px solid transparent;
    padding: 5px;
    outline: none;
    background: transparent;
    resize: none;
  }
  article{
    font-size: 11px;
    font-family: Nunito, sans-serif;
    position: absolute;
    transform: rotate(90deg);
    bottom: 30px;
    right: -20px;
  }
  svg{
    position: absolute;
    top: 0;
    right: 0;
    width: 23px;
    @media(max-width: 500px){
      width: 30px;
    }
    cursor: pointer;
    :hover{
      fill: transparent;
      stroke: #404040;
    }
  }
`;

export const Color = styled.div`
  display: block;
  margin: auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #404040;
`;

export const DialogColor = styled.main`
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: auto;
`;

export const DialogLabel = styled.main`
  width: 400px;
  height: 400px;
  @media(max-width: 1279px){
    width: 100%;
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  article:first-child{
    width: 100%;
    display: flex;
    flex-direction: column;
    header{
      padding: 5px 10px;
      justify-content: space-between;
      background: #7e5dea;
    }
    div{
      justify-content: center;
      padding-top: 20%;
    }
    div, header{
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
  article:last-child{
    padding: 10px;
  }
  label{
    width: 250px;
    font-size: 15px;
    font-weight: 500;
    color: white;
    margin-left: 10px;
    font-family: Poppins, sans-serif;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  input{
    font-family: Inter, sans-serif;
    padding: 7px 8px;
    border-radius: 5px;
    border: 2px solid transparent;
    margin: 4px 10px;
    background: #d6d7ff;
    font-size: 14px;
    outline: none;
    transition: all 0.4s;
    :focus{
      border: 2px solid #7e5dea;
      background: transparent;
    }
    :hover{
      opacity: 0.9;
    }
  }
`;