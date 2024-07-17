import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import WatchList from './pages/WatchList.tsx';
import Metas from './pages/Metas.tsx';
import Training from './pages/Training.tsx';
import Finance from './pages/Finance.tsx';
import Travel from './pages/Travel.tsx';
import Transactions from './pages/Transactions.tsx';
import CashFlow from './pages/CashFlow.tsx';
import Investments from './pages/Investments.tsx';
import Debts from './pages/Debts.tsx';
import FinanceSettings from './pages/FinanceSettings.tsx';
import './styles.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/training" element={<Training />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/cashflow" element={<CashFlow />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/debts" element={<Debts />} />
      <Route path="/finance-settings" element={<FinanceSettings />} />
    </Routes>
  );
};

export default App;