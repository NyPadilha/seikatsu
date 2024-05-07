import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import WatchList from './pages/WatchList.tsx';
import Metas from './pages/Metas.tsx';
import Training from './pages/Training.tsx';
import Finance from './pages/Finance.tsx';
import Travel from './pages/Travel.tsx';
import './styles.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/training" element={<Training />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/travel" element={<Travel />} />
    </Routes>
  );
}

export default App;
