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
import CreateSession from "./Main-Folder/create-session/createSession";
import AddMember from "./Main-Folder/add member/add-member";

const router = createBrowserRouter([
  { path: '/login', element: <Loginform/>},
  { path: '/', element: <Dashboard/>},
  { path: '/create-session', element: <CreateSession/>},
  { path: '/add-member', element: <AddMember/>},
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
