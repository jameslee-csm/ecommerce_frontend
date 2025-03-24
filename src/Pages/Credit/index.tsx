import React, { useState, useEffect, useMemo } from "react";
import { Button, Title, NumberField } from "@clickhouse/click-ui";
import Navbar from "../../components/Navbar";
import { apiService } from "../../services/api";

const Credit: React.FC = () => {
  const [balance, setBalance] = useState(0); // Mock initial balance
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchBalance();
  }, []);

  const customerID = useMemo(() => {
    const testCustomerID = localStorage.getItem("testCustomerId");
    return testCustomerID ? testCustomerID : null;
  }, [localStorage]);

  const fetchBalance = async () => {
    try {
      if (customerID) {
        const { balance } = await apiService.getBalance(customerID);
        setBalance(balance);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTopup = async () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0 && customerID) {
      try {
        await apiService.grantBalance(customerID, value, "TOPUP");
        await fetchBalance();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeduct = async () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0 && customerID) {
      try {
        await apiService.deductBalance(customerID, value, "DEDUCT");
        await fetchBalance();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Title type="h1">Credit Management</Title>
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <Title type="h2">Current Balance: ${balance.toFixed(2)}</Title>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              maxWidth: "500px",
            }}
          >
            <NumberField
              value={amount}
              onChange={(value) => setAmount(value)}
              loading={false}
              min={10}
            />
            <Button label="Top Up" onClick={handleTopup} />
            <Button label="Deduct" onClick={handleDeduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
