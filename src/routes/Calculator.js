import React from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import CalculatorComp from '../components/Calculator/CalculatorComp';

function Calculator({ location }) {
  return (
    <div>
      <MainLayout location={location}>
        <CalculatorComp />
      </MainLayout>
    </div>
  );
}

export default Calculator;
