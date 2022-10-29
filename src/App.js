import React from "react";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Main from "./components/common/Main";
import HomePage from "./components/modules/Home/HomePage";
import Loader from "./components/common/Loader";

const App = () => {
  return (
    <div className='App'>
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
