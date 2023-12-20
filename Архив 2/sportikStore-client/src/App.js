import './App.css';
import AppLayout from './AppLayout/AppLayout';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <AppLayout></AppLayout>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
