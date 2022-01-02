import "./sass/styles.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import WatchList from "./pages/WatchList";
import Watched from "./pages/Watched";
import Add from "./pages/Add";
import Login from "./pages/Login";
import "./lib/font-awesome/css/all.min.css";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import MainNavigate from "./pages/MainNavigate";

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        <Routes>
          <Route element={<MainNavigate />}>
            <Route element={<PrivateRoute />}>
              <Route path="/watched" element={<Watched />} />
              <Route path="/add" element={<Add />} />
              <Route path="/" element={<WatchList />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
