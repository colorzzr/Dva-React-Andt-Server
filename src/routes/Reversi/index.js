import React from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ReversiGame from './Reversi.js';


function ReversiIndex({ location }) {
  return (
    <div>
      <MainLayout location={location}>
        <ReversiGame />
      </MainLayout>
    </div>
  );
}

export default ReversiIndex;
