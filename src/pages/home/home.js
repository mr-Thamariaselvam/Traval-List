// Home.js
import React, { useState } from "react";
import Logo from "../../Components/logo/logo";
import Form from "../../Components/form/form";
import PackingList from "../../Components/packingList/packinglist";
import Footer from "../../Components/footer/footer";
import Modal from "../../Components/model/model";

function Home() {
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState(false);

  function handleItems(item) {
    // Check if the item already exists in the list
    const existingIndex = items.findIndex(
      (existing) =>
        existing.description.toLowerCase() === item.description.toLowerCase()
    );
    if (existingIndex !== -1) {
      // Item already exists, set alert
      setAlert(true);
    } else {
      // Remove the previous items with the same name and different quantities
      const updatedItems = items.filter(
        (existing) =>
          existing.description.toLowerCase() !== item.description.toLowerCase()
      );

      // Add the new item to the list
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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      {alert && (
        <Modal
          isOpen={alert}
          onConfirm={closeAlert}
          onCancel={closeAlert}
          isAlert={alert}
        >
          ✅ Your Item is already in our list
        </Modal>
      )}
      <Footer items={items} />
    </div>
  );
}

export default Home;
