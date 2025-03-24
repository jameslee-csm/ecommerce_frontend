import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@clickhouse/click-ui";
import Navbar from "../../components/Navbar";
import { apiService, PurchaseDetailPayload } from "../../services/api";

const PurchaseDetail: React.FC = () => {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const [purchaseDetail, setPurchaseDetail] = useState<PurchaseDetailPayload>();

  useEffect(() => {
    (async function () {
      if (purchaseId) {
        const data = await apiService.getPurchaseDetail(purchaseId);
        setPurchaseDetail(data);
      }
    })();
  }, [purchaseId]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Title type="h1" style={{ marginBottom: "1rem" }}>
          Purchase Detail ({purchaseDetail?.purchase.status})
        </Title>
        <p>Purchase ID: {purchaseId}</p> {/* Display the purchaseId */}
        <p>Product Name: {purchaseDetail?.product.name}</p>
        <p>Product Desc: {purchaseDetail?.product.description}</p>
        <p>Product Price: ${purchaseDetail?.product.price}</p>
        <p>Price at Purchase: ${purchaseDetail?.purchase.priceAtPurchase}</p>
        <p>Quantity: {purchaseDetail?.purchase.quantity}</p>
        <h4>Refunds</h4>
        {purchaseDetail?.purchase.refunds.map((refund, index) => (
          <div key={index}>
            <p>Refund Amount: ${refund.amount}</p>
            <p>
              Refund Date: {new Date(refund.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {purchaseDetail && (
          <>
            <hr style={{ border: "1px solid #ccc", margin: "1rem 0" }} />
            <p>
              Total: $
              {purchaseDetail.purchase.priceAtPurchase *
                purchaseDetail.purchase.quantity}
              (at purchase) - $
              {purchaseDetail.purchase.refunds.reduce(
                (acc, refund) => acc + refund.amount,
                0
              )}{" "}
              (refunded) = $
              {purchaseDetail.purchase.priceAtPurchase *
                purchaseDetail.purchase.quantity -
                purchaseDetail.purchase.refunds.reduce(
                  (acc, refund) => acc + refund.amount,
                  0
                )}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default PurchaseDetail;
