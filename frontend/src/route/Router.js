import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "../features/books/HomeScreen";
import AddBookForm from "../features/books/AddBookForm";
import EditBookForm from "../features/books/EditBookForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/add-book",
    element: <AddBookForm />,
  },
  {
    path: "/edit/:id",
    element: <EditBookForm />,
  },
]);

export default router;
