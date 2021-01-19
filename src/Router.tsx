import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Header} from "./components/Header";

interface IRouterProps {

}

export const Router: React.FC<IRouterProps> = () => {
  return (
      <BrowserRouter>
          <Header />
      </BrowserRouter>
  );
};
