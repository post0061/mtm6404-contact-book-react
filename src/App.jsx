import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
          <Route path="/contact/:id" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;