import { Fragment } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Params,
} from "react-router-dom";
import "./index.css";
import "./App.css";
import Loginform from "./Main-Folder/auth/login";
import Dashboard from "./Main-Folder/Home/dashboard";

const router = createBrowserRouter([
  { path: '/login', element: <Loginform/>},
  { path: '/', element: <Dashboard/>},
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
