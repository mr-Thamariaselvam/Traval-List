import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/authentication/auth";
import Customizedlist from "./pages/customizelist/customizedlist";
import TestComp from "./components/testcomp/testcomp";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState(false);
  const [initialItem, setInitialItem] = useState([
    "Charger",
    "Shoes",
    "Shirts",
    "Pants",
    "Id Cards",
    "Wallets",
  ]);

  function handleItems(item) {
    const existingIndex = items.findIndex(
      (existing) =>
        existing.description.toLowerCase() === item.description.toLowerCase()
    );

    if (existingIndex !== -1) {
      if (items[existingIndex].quantity !== item.quantity) {
        const updatedItems = items.map((existing, index) =>
          index === existingIndex
            ? { ...existing, quantity: item.quantity }
            : existing
        );
        setItems(updatedItems);
      } else {
        setAlert(true);
      }
    } else {
      const updatedItems = items.filter(
        (existing) =>
          existing.description.toLowerCase() !== item.description.toLowerCase()
      );
      setItems([...updatedItems, item]);
    }
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) {
      setItems([]);
    }
  }

  function closeAlert() {
    setAlert(false);
  }

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const props = {
    items,
    alert,
    setInitialItem,
    initialItem,
    handleItems,
    handleDeleteItem,
    handleToggleItem,
    handleClearList,
    closeAlert,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth onLogin={handleLogin} />,
    },
    {
      path: "/home",
      element: authenticated ? <Home {...props} /> : <Navigate to="/" />,
    },
    {
      path: "/customizedlist",
      element: authenticated ? (
        <Customizedlist {...props} />
      ) : (
        <Navigate to="/" />
      ),
    },

    {
      path:"/test",
      element:<TestComp/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
