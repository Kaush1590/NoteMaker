import ReactDom from "react-dom/client"
import App from './App'
import "./index.css"
import { BrowserRouter } from 'react-router'
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css"

ReactDom.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        }
      />
  </BrowserRouter>
)
