import React, { useState, useEffect } from "react";
import { Button, Title, ConfirmationDialog } from "@clickhouse/click-ui";
import Navbar from "../../components/Navbar";
import { IProduct } from "../../services/api";

interface CartItem extends IProduct {
  quantity: number;
}

interface CartItems {
  [key: string]: CartItem;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
    setCartItems(cart);
  }, []);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prevItems): CartItems => {
      return {
        ...prevItems,
        [id]: {
          ...prevItems[id],
          quantity: prevItems[id].quantity + change,
        },
      };
    });
  };

  const totalPrice = Object.values(cartItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {};

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Title type="h1">Shopping Cart</Title>

        {Object.values(cartItems).map((item) => (
          <div
            key={item.sku}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            <h3>{item.name}</h3>
            <h3>${item.price.toFixed(2)}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Button label="-" onClick={() => updateQuantity(item.sku, -1)} />
              <h3>{item.quantity}</h3>
              <Button label="+" onClick={() => updateQuantity(item.sku, 1)} />
            </div>
          </div>
        ))}

        <div style={{ marginTop: "2rem", textAlign: "right" }}>
          <Title type="h2">Total: ${totalPrice.toFixed(2)}</Title>
          <Button label="Purchase" onClick={() => setShowConfirmDialog(true)} />
        </div>

        <ConfirmationDialog
          title="Confirm Purchase"
          open={showConfirmDialog}
          primaryActionLabel="Confirm"
          secondaryActionLabel="Cancel"
          onConfirm={handlePurchase}
          onCancel={() => setShowConfirmDialog(false)}
        >
          {Object.values(cartItems).map((item) => (
            <div key={item.sku} style={{ margin: "1rem 0" }}>
              <h3>
                {item.name} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </h3>
            </div>
          ))}
          <Title type="h3">Total: ${totalPrice.toFixed(2)}</Title>
        </ConfirmationDialog>
      </div>
    </div>
  );
};

export default Cart;
