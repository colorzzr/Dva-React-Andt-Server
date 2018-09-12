import React from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import TunelGame from './index';


function TubeGame({ location }) {
  return (
    <div>
      <MainLayout location={location}>
        <TunelGame />
      </MainLayout>
    </div>
  );
}

export default TubeGame;
