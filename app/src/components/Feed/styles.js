import styled from 'styled-components';

export const GridFeed = styled.main`
  padding: 100px 10px 10px 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 400px));
  grid-auto-rows: min-content;
  justify-content: space-around;
  grid-gap: 10px;
  ::selection{
    background: transparent;
  }
`;