import "./sass/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WatchList from "./pages/WatchList";
import Watched from "./pages/Watched";
import Add from "./pages/Add";
import "./lib/font-awesome/css/all.min.css";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/personal-watch-list" element={<WatchList />} />
          <Route path="/personal-watch-list/watched" element={<Watched />} />
          <Route path="/personal-watch-list/add" element={<Add />} />
        </Routes>
      </Router>
  );
}

export default App;
