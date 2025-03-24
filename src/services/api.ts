import axios from "axios";

export interface GetBalancePayload {
  balance: number;
}

export interface GrantBalancePayload {
  message: string;
}

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;
  lastModifiedAt: number;
}

export interface GetProductPayload {
  products: IProduct[];
}

export interface PurchaseProductPayload {
  purchaseId: string;
}

export interface IRefund {
  _id: string;
  purchaseId: string;
  amount: number;
  reason: string;
  createdAt: string;
}

export interface PurchaseHistoryPayload {
  _id: string;
  customerId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  status: "COMPLETED" | "REFUNDED" | "PARTIALLY_REFUNDED";
  shipmentId: string;
  refunds: IRefund[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  billingAddress: Address;
  shippingAddress: Address;
  createdAt: number;
  lastModifiedAt: number;
}

export interface PurchaseDetailPayload {
  purchase: PurchaseHistoryPayload;
  customer: Customer;
  product: IProduct;
}

class ApiService {
  private baseUrl: string = "http://127.0.0.1:3000/api"; // Replace with your actual API URL

  async getBalance(customerId: string): Promise<GetBalancePayload> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/credits/${customerId}/balance`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching data", error);
      throw error;
    }
  }

  async grantBalance(
    customerId: string,
    amount: number,
    reason: string
  ): Promise<GrantBalancePayload> {
    try {
      const response = await axios.post(`${this.baseUrl}/credits/grant`, {
        customerId,
        amount,
        reason,
      });
      return response.data;
    } catch (error) {
      console.error("Error granting balance:", error);
      throw error;
    }
  }

  async deductBalance(
    customerId: string,
    amount: number,
    reason: string
  ): Promise<GrantBalancePayload> {
    try {
      const response = await axios.post(`${this.baseUrl}/credits/deduct`, {
        customerId,
        amount,
        reason,
      });
      return response.data;
    } catch (error) {
      console.error("Error deducting balance:", error);
      throw error;
    }
  }

  async getProductList(): Promise<GetProductPayload> {
    try {
      const response = await axios.get(`${this.baseUrl}/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  }

  async purchaseProduct(
    customerId: string,
    productId: string,
    quantity: number,
    promocode?: string
  ): Promise<PurchaseProductPayload> {
    try {
      const response = await axios.post(`${this.baseUrl}/purchases`, {
        customerId,
        productId,
        quantity,
        promocode,
      });
      return response.data;
    } catch (error) {
      console.error("Error granting balance:", error);
      throw error;
    }
  }

  async getPurchaseHistory(
    customerId: string
  ): Promise<PurchaseHistoryPayload[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/purchases/${customerId}`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching data", error);
      throw error;
    }
  }

  async getPurchaseDetail(purchaseId: string): Promise<PurchaseDetailPayload> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/purchases/detail/${purchaseId}`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching data", error);
      throw error;
    }
  }

  async getTestCustomerId(): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/test`);
      return response.data.customerId;
    } catch (error) {
      console.log("Error fetching data", error);
      throw error;
    }
  }

  async createTestData(): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/test`);
      return response.data.customerId;
    } catch (error) {
      console.log("Error fetching data", error);
      throw error;
    }
  }

  // Products
  // async getProducts(): Promise<Product[]> {
  //   try {
  //     const response = await fetch(`${this.baseUrl}/products`);
  //     if (!response.ok) throw new Error("Failed to fetch products");
  //     return response.json();
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     throw error;
  //   }
  // }
}

// Create a singleton instance
export const apiService = new ApiService();
