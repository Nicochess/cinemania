import "./sass/styles.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WatchList from "./pages/WatchList";
import Watched from "./pages/Watched";
import Add from "./pages/Add";
import Login from "./pages/Login"
import "./lib/font-awesome/css/all.min.css";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<WatchList />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/add" element={<Add />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
