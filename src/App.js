import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Alert from "./Common/Alert/Alert";
import Loading from "./Common/Alert/Loading";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import Contents from "./Screens";
import { refreshTokenAction } from "./redux/action/AuthAction";

function App() {
  const alert = useSelector((state) => state.AlertReducer);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert.status && alert.status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
      setMessage(alert);
    }
  }, [alert]);
  useEffect(() => {
    const checkLogin = localStorage.getItem("isLogin");
    if (checkLogin) {
      const refresh_token = async () => {
        dispatch(refreshTokenAction());
        setTimeout(() => {
          refresh_token();
        }, 10 * 60 * 3000);
      };
      refresh_token();
    }
  }, [dispatch]);

  return (
    <Router>
      <Alert message={message} />
      <Loading loading={loading} />
      <Contents />
    </Router>
  );
}

export default App;
