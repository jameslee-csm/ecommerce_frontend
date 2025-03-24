import React, { useState, useEffect, useMemo } from "react";
import {
  Title,
  ConfirmationDialog,
  NumberField,
  TextField,
  Checkbox,
  Label,
  GridContainer,
} from "@clickhouse/click-ui";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { IProduct, apiService } from "../../services/api";

// Mock data - in real app this would come from an

const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [promocode, setPromocode] = useState<string>();
  const [showPurchaseDialog, setShowConfirmDialog] = useState(false);
  const [showPromocodeInput, setShowPromocodeInput] = useState(false);

  useEffect(() => {
    (async () => {
      const { products } = await apiService.getProductList();
      setProducts(products);
    })();
  }, []);

  const customerID = useMemo(() => {
    const testCustomerID = localStorage.getItem("testCustomerId");
    return testCustomerID ? testCustomerID : null;
  }, [localStorage]);

  // const handleAddToCart = (product: IProduct) => {
  //   const cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
  //   if (!!cart[product.sku]) {
  //     cart[product.sku] = {
  //       ...cart[product.sku],
  //       quantity: cart[product.sku].quantity + 1,
  //     };
  //   } else {
  //     cart[product.sku] = {
  //       ...product,
  //       quantity: 1,
  //     };
  //   }
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  const handlePurchase = (product: IProduct) => {
    setShowConfirmDialog(true);
    setSelectedProduct(product);
  };

  const confirmPurchase = async () => {
    if (customerID) {
      try {
        if (!selectedProduct)
          throw new Error("There is no product to purchase");
        else
          await apiService.purchaseProduct(
            customerID,
            selectedProduct._id,
            purchaseQuantity,
            promocode
          );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangePromocode = (value: string) => {
    setPromocode(value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Title type="h1">Products</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.sku}
              id={product.sku}
              name={product.name}
              price={product.price}
              onPurchase={() => handlePurchase(product)}
            />
          ))}
        </div>
      </div>
      <ConfirmationDialog
        title="Confirm Purchase"
        open={showPurchaseDialog}
        primaryActionLabel="Confirm"
        secondaryActionLabel="Cancel"
        onConfirm={confirmPurchase}
        onCancel={() => setShowConfirmDialog(false)}
      >
        <div style={{ margin: "1rem 0" }}>
          <h3>{selectedProduct?.name}</h3>
          <h3>${selectedProduct?.price}</h3>
          <GridContainer gridAutoFlow="column" gap="md">
            <NumberField
              loading
              name="quantity"
              value={purchaseQuantity}
              min={1}
              onChange={(value) => {
                setPurchaseQuantity(Number(value));
              }}
            />
            <Label style={{ alignContent: "center" }}>I have Promo Code</Label>
            <Checkbox
              checked={showPromocodeInput}
              onClick={(e) => {
                setShowPromocodeInput(!showPromocodeInput);
              }}
            />
            {showPromocodeInput && (
              <TextField
                name="promoCode"
                value={promocode}
                onChange={handleChangePromocode}
              />
            )}
          </GridContainer>
        </div>
        <Title type="h3">Total: ${selectedProduct?.price}</Title>
      </ConfirmationDialog>
    </div>
  );
};

export default Home;
