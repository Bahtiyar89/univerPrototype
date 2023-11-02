import "react-app-polyfill/stable";
import "core-js";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";
import App from "./App";
//import reportWebVitals from './reportWebVitals'
import { Provider } from "react-redux";
import store from "./store";
import { QueryClientProvider } from "react-query";
import { queryClient } from "services/accaountAPI";

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
