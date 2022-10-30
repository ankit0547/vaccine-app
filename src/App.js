import React from "react";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Main from "./components/common/Main";
import HomePage from "./components/modules/Home/HomePage";
import Loader from "./components/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className='App'>
      <ToastContainer />
      <Loader />
      <Header />
      <Main>
        <Sidebar />
        <HomePage />
      </Main>
    </div>
  );
};

export default App;
