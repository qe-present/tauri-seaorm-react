import  {RouterProvider} from 'react-router-dom'
import router from "./router/index.jsx";
import {Provider} from "react-redux";
import store from "./store/index.jsx";
function App() {
  return (
      <Provider store={store}>
      <RouterProvider router={router}/>
        </Provider>
  )
}

export default App;
