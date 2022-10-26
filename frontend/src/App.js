import React, { useEffect } from 'react'
import AppRoutes from './routes'
import Layout from './components/layout/layout'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './App.css';

function App() {
  return (
    <BrowserRouter >
      <Provider store={store} >
        <Layout>
            <AppRoutes />
        </Layout>
      </Provider>
    </BrowserRouter>
   
  );
}

export default App;
