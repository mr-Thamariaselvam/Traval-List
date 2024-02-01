import React from "react";
import "../footer/footer.css";
export default function Footer({ items }) {
  const numItems = items.length;
  // Packed item is true then count
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100) || 0;
  return (
    <footer className="stats">
      {percentage === 100
        ? "You got Everything ! Ready To GO ✈️"
        : `
            💼 You Have ${numItems} Items on your list , and you already packed
            ${numPacked}(${percentage}%)
          `}
    </footer>
  );
}
