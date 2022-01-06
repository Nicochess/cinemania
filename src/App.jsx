import "./sass/styles.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import WatchList from "./pages/WatchList";
import Watched from "./pages/Watched";
import Add from "./pages/Add";
import Login from "./pages/Login";
import "./lib/font-awesome/css/all.min.css";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import MainNavigate from "./pages/MainNavigate";
import { GlobalProvider } from "./context/GlobalState";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route element={<MainNavigate />}>
              <Route element={<PrivateRoute />}>
                <Route path="/watched" element={<Watched />} />
                <Route path="/add" element={<Add />} />
                <Route path="/watch" element={<WatchList />} />
              </Route>
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
