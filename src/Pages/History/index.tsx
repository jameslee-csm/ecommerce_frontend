import React, { useState, useEffect, useMemo } from "react";
import { Title, GridContainer } from "@clickhouse/click-ui";
import Navbar from "../../components/Navbar";
import { apiService, PurchaseHistoryPayload } from "../../services/api";
import PurchaseCard from "../../components/PurchaseCard";

interface PurchaseItem {
  id: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

const History: React.FC = () => {
  const [purchaseList, setPurchaseHistory] = useState<PurchaseHistoryPayload[]>(
    []
  );

  const customerID = useMemo(() => {
    const customerID = localStorage.getItem("testCustomerId");
    return customerID ? customerID : null;
  }, [localStorage]);

  useEffect(() => {
    (async function () {
      if (customerID) {
        const data = await apiService.getPurchaseHistory(customerID);
        setPurchaseHistory(data);
      }
    })();
  }, []);
  // Mock purchase history data
  const purchases: PurchaseItem[] = [
    {
      id: "1",
      date: "2024-03-20",
      items: [
        { name: "Product 1", quantity: 2, price: 99.99 },
        { name: "Product 2", quantity: 1, price: 149.99 },
      ],
      total: 349.97,
    },
  ];

  const handleRefund = (purchaseId: string) => {
    // TODO: Implement refund functionality
    console.log(`Refunding purchase ${purchaseId}`);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Title type="h1" style={{ marginBottom: "1rem" }}>
          Purchase History
        </Title>
        <GridContainer
          columnGap="md"
          rowGap="md"
          gridTemplateColumns="auto auto auto"
          justifyItems="stretch"
        >
          {purchaseList.map((purchase, index) => (
            <PurchaseCard key={index} orderIndex={index + 1} {...purchase} />
          ))}
        </GridContainer>
      </div>
    </>
  );
};

export default History;
