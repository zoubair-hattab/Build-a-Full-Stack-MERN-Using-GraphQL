import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import TransactionPage from './pages/TransactionPage';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query.js';
import IsAuth from './components/routerGard/IsAuth.jsx';
import IsNotAuth from './components/routerGard/IsNotAuth.jsx';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<IsAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/transaction/:id" element={<TransactionPage />} />
        </Route>
        <Route element={<IsNotAuth />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>{' '}
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
