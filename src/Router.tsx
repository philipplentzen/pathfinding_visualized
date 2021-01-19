import React from 'react';
import {BrowserRouter} from "react-router-dom";

interface IRouterProps {

}

export const Router: React.FC<IRouterProps> = () => {
  return (
      <BrowserRouter>
          Hello
      </BrowserRouter>
  );
};
