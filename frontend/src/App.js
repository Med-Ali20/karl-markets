import React, { useEffect } from 'react'
import AppRoutes from './routes'
import Layout from './components/layout/layout'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import ReactPixel, { fbq } from 'react-facebook-pixel'
import './App.css';

function App() {
  useEffect(() => {
    ReactPixel.fbq('init', '684774793231540')
    ReactPixel.fbq('track', 'PageView')
    
  }, [])
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
