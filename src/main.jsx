import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



const globalInfo = {
  name: "太郎",
  age: 24,
};
const GlobalInfoContext = createContext(globalInfo);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalInfoContext.Provider value={globalInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalInfoContext.Provider>,
)

export default GlobalInfoContext;