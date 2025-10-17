import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/forum" replace />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/forum" replace />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/forum" replace /> : <Register />}
        />
        <Route
          path="/forum"
          element={<Forum user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
