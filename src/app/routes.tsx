import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Feedback } from "./components/Feedback";
import { Admin } from "./components/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "feedback", Component: Feedback },
      { path: "admin", Component: Admin },
    ],
  },
]);
