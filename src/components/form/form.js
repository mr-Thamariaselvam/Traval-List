import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./form.css";

export default function Form({ onAddItems, initialItem }) {
  const [selectedDescription, setSelectedDescription] = useState(
    initialItem[0]
  );
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const select = {
    backgroundColor: "#ffebb3",
    color: "#5a3e2b",
    fontFamily: "inherit",
    border: "none",
    fontWeight: 700,
    fontSize: "2rem",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    width: "10%",
  };
  const selectInput = {
    backgroundColor: "#ffebb3",
    color: "#5a3e2b",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 700,
  };

  function handleClick() {
    navigate("/customizedlist");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedDescription || !quantity) {
      return null;
    }

    const newItem = {
      description: selectedDescription,
      quantity,
      package: false,
      id: Date.now(),
    };
    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <Select
        sx={select}
        id="demo-simple-select-filled"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        inputProps={{ "aria-label": "without label" }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <MenuItem value={num} key={num} sx={selectInput}>
            {num}
          </MenuItem>
        ))}
      </Select>
      <Select
        id="demo-simple-select-filled"
        value={selectedDescription}
        onChange={(event) => setSelectedDescription(event.target.value)}
        sx={select}
        inputProps={{ "aria-label": "without label" }}
      >
        {initialItem.map((item, i) => (
          <MenuItem key={i} sx={selectInput} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <button type="submit">Add</button>
      <button type="button" onClick={handleClick}>
        Customize ur Listed Item
      </button>
    </form>
  );
}
