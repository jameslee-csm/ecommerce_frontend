import React from "react";
import { Button, Text, Title, CardPrimary } from "@clickhouse/click-ui";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  onPurchase: () => void;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  onPurchase,
}) => {
  return (
    <CardPrimary
      title={name}
      description={`$${price.toFixed(2)}`}
      infoText="Read More"
      onButtonClick={onPurchase}
    />
  );
};

export default ProductCard;
