import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import './styles.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
