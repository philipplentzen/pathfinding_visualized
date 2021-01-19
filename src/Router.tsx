import React from 'react';
import {BrowserRouter} from "react-router-dom";

interface IRouterProps {

}

const Router: React.FC<IRouterProps> = () => {
  return (
      <BrowserRouter>
          Hello
      </BrowserRouter>
  );
}

export default Router;
