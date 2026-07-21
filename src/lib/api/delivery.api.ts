import { api } from "../axios";

export interface Vehicle {
  id: string;
  name: string;
  numberPlate: string;
  status: "AVAILABLE" | "BUSY" | "MAINTENANCE";
}

export interface Delivery {
  id: string;
  invoiceNo: string;
  vehicleId?: string;
  customerName: string;
  address: string;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}

export const deliveryApi = {
  /**
   * List vehicles
   * GET /api/vehicles
   */
  getVehicles: async (): Promise<Vehicle[]> => {
    const { data } = await api.get<{ vehicles: Vehicle[] }>("/vehicles");
    return data.vehicles;
  },

  /**
   * Create vehicle
   * POST /api/vehicles
   */
  createVehicle: async (vehicleData: Omit<Vehicle, "id">): Promise<Vehicle> => {
    const { data } = await api.post<{ vehicle: Vehicle }>(
      "/vehicles",
      vehicleData,
    );
    return data.vehicle;
  },

  /**
   * List deliveries
   * GET /api/deliveries
   */
  getDeliveries: async (): Promise<Delivery[]> => {
    const { data } = await api.get<{ deliveries: Delivery[] }>("/deliveries");
    return data.deliveries;
  },

  /**
   * Create delivery
   * POST /api/deliveries
   */
  createDelivery: async (
    deliveryData: Omit<Delivery, "id">,
  ): Promise<Delivery> => {
    const { data } = await api.post<{ delivery: Delivery }>(
      "/deliveries",
      deliveryData,
    );
    return data.delivery;
  },

  /**
   * Update delivery status
   * PUT /api/deliveries/:id/status
   */
  updateDeliveryStatus: async (
    id: string,
    status: Delivery["status"],
  ): Promise<Delivery> => {
    const { data } = await api.put<{ delivery: Delivery }>(
      `/deliveries/${id}/status`,
      { status },
    );
    return data.delivery;
  },
};
