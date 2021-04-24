import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()

axios.defaults.withCredentials = true;
toast.configure()

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
