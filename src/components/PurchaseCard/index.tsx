import {
  Title,
  Button,
  CardSecondary,
  CardPrimary,
} from "@clickhouse/click-ui";
import { IRefund } from "../../services/api";

interface PurchaseCardProps {
  _id: string;
  orderIndex: number;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  status: "COMPLETED" | "REFUNDED" | "PARTIALLY_REFUNDED";
  shipmentId: string;
  refunds: IRefund[];
  createdAt: string;
}

const PurchaseCard: React.FC<PurchaseCardProps> = (props) => {
  const {
    _id,
    orderIndex,
    productId,
    quantity,
    priceAtPurchase,
    status,
    shipmentId,
    refunds,
    createdAt,
  } = props;
  return (
    <CardSecondary
      title={`Order #${orderIndex}`}
      description={`Purchase ${_id}`}
      badgeText={status}
      badgeState="success"
      infoText="Read More"
      infoUrl={`/purchase/${_id}`}
    >
      <h3>{new Date(createdAt).toLocaleDateString()}</h3>
    </CardSecondary>
  );
};

export default PurchaseCard;
