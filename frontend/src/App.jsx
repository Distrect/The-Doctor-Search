import { lazy } from "react";
import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));
const Doctor = lazy(() => import("./pages/Doctor/Doctor"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/doctor/*",
    element: <Search />,
  },
  {
    path: "/viewdoctor/:id",
    element: <Doctor />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
