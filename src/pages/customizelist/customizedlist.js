import React, { useState } from "react";
import Logo from "../../components/logo/logo";
import { useNavigate } from "react-router-dom";

function Customizedlist({ handleItems, setInitialItem }) {
  const [description, setDescription] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();

  const newItem = {
    description,
    quantity: "",
    packed: false,
    id: Date.now(),
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!description || isDuplicate(description)) {
      // If the description is empty or it's a duplicate, return early
      return;
    }

    // Add the new item to the array
    setAddedItems((prevItems) => [...prevItems, newItem]);

    // Clear the description field after adding the item
    setDescription("");
  }

  function isDuplicate(newDescription) {
    // Check if the new description already exists in the added items (case-insensitive)
    return addedItems.some(
      (item) => item.description.toLowerCase() === newDescription.toLowerCase()
    );
  }

  function handleSave() {
    // Call the parent component's handleItems function and pass the addedItems array
    const descriptions = addedItems.map((item) => item.description);
    setInitialItem(descriptions);

    navigate("/home");
  }

  return (
    <>
      <Logo />
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>

      {/* Render the added items as a list */}
      {addedItems.length > 0 && (
        <div className="list">
          <h2>Added Items:</h2>
          <ul>
            {addedItems.map((item) => (
              <li key={item.id}>{item.description}</li>
            ))}
          </ul>

          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
}

export default Customizedlist;
