import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Home, Contact, Login, Register, Reset } from './pages';

// Components
import { Header,Footer } from './components';


function App() {
  
  return (
    <>
      <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/contact" element={ <Contact /> }></Route>
              <Route path="/login" element={ <Login /> }></Route>
              <Route path="/register" element={ <Register /> }></Route>
              <Route path="/reset" element={ <Reset /> }></Route>
            </Routes>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
