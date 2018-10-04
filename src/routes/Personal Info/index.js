import React from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import PersonalInfo from './PersonInfo.js';


function PersonalInfoIndex({ location }) {
  return (
    <div>
      <MainLayout location={location}>
        <PersonalInfo />
      </MainLayout>
    </div>
  );
}

export default PersonalInfoIndex;
