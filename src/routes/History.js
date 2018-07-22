import React from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import HistoryTable from '../components/History/HistoryTable';


function History({ location }) {
  return (
    <div>
      <MainLayout location={location}>
        <HistoryTable />
      </MainLayout>
    </div>
  );
}

export default History;

