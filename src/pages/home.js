import React from "react";
import Logo from "../components/logo/logo";
import Form from "../components/form/form";
import PackingList from "../components/packingList/packinglist";
import Model from "../components/model/model";
import Footer from "../components/footer/footer";
function Home({
  items,
  initialItem,
  alert,
  handleItems,
  handleDeleteItem,
  handleToggleItem,
  handleClearList,
  closeAlert,
}) {
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} initialItem={initialItem} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      {alert && (
        <Model
          isOpen={alert}
          onConfirm={closeAlert}
          onCancel={closeAlert}
          isAlert={alert}
        >
          ✅ Your Item is already in our list
        </Model>
      )}
      <Footer items={items} />
    </div>
  );
}

export default Home;
