import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Home,Contact } from './pages';

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
            </Routes>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
