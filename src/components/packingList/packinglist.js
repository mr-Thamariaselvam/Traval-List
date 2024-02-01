import React, { useState } from "react";
import Modal from "../model/model";
import "../packingList/packinglist.css";
export default function PackingList({
  items,
  onDeleteItems,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  console.log(items);
  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteItem = () => {
    onDeleteItems(itemToDelete);
    closeDeleteModal();
  };
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((items) => {
          return (
            <Item
              item={items}
              key={items.id}
              onDeleteItems={() => openDeleteModal(items.id)}
              onToggleItems={onToggleItems}
            />
          );
        })}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={onClearList}>clear List</button>
        <Modal
          isOpen={isDeleteModalOpen}
          onConfirm={handleDeleteItem}
          onCancel={closeDeleteModal}
        >
          ⚠️ Are you sure you want to delete this item?
        </Modal>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button
        onClick={(id) => onDeleteItems(item.id)}
        style={{ color: "red", fontSize: 24 }}
      >
        <i className="material-icons">delete</i>
      </button>
    </li>
  );
}
