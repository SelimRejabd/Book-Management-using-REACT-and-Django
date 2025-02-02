import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, deleteBook, clearMessages } from "./BookSlice";
import { PencilAltIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);
  const successMessage = useSelector((state) => state.books.successMessage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBooks(searchTerm));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearMessages());
    }
  }, [successMessage, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  let content;

  if (bookStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (bookStatus === "succeeded") {
    content = books.map((book) => (
      <div key={book.id} className="p-4 border rounded shadow-md">
        <img
          src={book.book_image}
          alt={book.title}
          className="w-32 h-32 object-cover mb-4"
        />
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-600">{book.isbn}</p>
        <div className="flex justify-between mt-4">
          <Link to={`/edit/${book.id}`}>
            <button className="bg-blue-500 text-white p-2 rounded-full">
              <PencilAltIcon className="h-5 w-5" />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(book.id)}
            className="bg-red-500 text-white p-2 rounded-full"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    ));
  } else if (bookStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        
        <h1 className="text-2xl font-bold">BOOKS</h1>
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={handleSearch}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <Link to="/add-book/">
          <button className="bg-green-500 text-white p-2 rounded-full">
            <PlusIcon className="h-5 w-5" />
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{content}</div>
    </div>
  );
};

export default HomeScreen;
