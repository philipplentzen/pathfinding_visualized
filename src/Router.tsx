import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AlgorithmPage} from "./pages/AlgorithmPage";
import {Layout} from "./components/Layout";

interface IRouterProps {

}

export const Router: React.FC<IRouterProps> = () => {
  return (
      <BrowserRouter>
          <Layout>
              <AlgorithmPage />
          </Layout>
      </BrowserRouter>
  );
};
