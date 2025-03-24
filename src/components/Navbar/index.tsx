import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "@clickhouse/click-ui";
import { apiService } from "../../services/api";

const Navbar: React.FC = () => {
  const [testCustomerId, setTestCustomerId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let customerId = await apiService.getTestCustomerId();
      if (customerId) {
        setTestCustomerId(customerId);
        localStorage.setItem("testCustomerId", customerId);
      }
    })();
  }, []);

  const handleCreateTestData = async () => {
    const customerId = await apiService.createTestData();
    localStorage.setItem("testCustomerId", customerId);
    setTestCustomerId(customerId);
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2>E-Commerce</h2>
      </Link>

      <div style={{ display: "flex", gap: "1rem" }}>
        {testCustomerId ? (
          <>
            <Link to="/history" style={{ textDecoration: "none" }}>
              <Button label="Purchase History" />
            </Link>
            {/* <Link to="/cart" style={{ textDecoration: "none" }}>
          <Button label="Cart" />
        </Link> */}
            <Link to="/credit" style={{ textDecoration: "none" }}>
              <Button label="Credit" />
            </Link>
          </>
        ) : (
          <Button label="Create Test Data" onClick={handleCreateTestData} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
