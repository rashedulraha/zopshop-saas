"use client";

import { useState } from "react";
import { 
  Truck, Search, MapPin, User, DollarSign, Calendar, CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Delivery {
  invoice: string;
  customer: string;
  address: string;
  driver: string;
  vehicle: string;
  deliveryCost: number;
  status: "Completed";
  date: string;
}

const initialDeliveries: Delivery[] = [
  {
    invoice: "INV-1001",
    customer: "Olivia Martin",
    address: "House 45, Road 11, Banani, Dhaka",
    driver: "John Doe",
    vehicle: "Covered Van - V102",
    deliveryCost: 15.00,
    status: "Completed",
    date: "13 Oct 2026"
  },
  {
    invoice: "INV-0980",
    customer: "Isabella Nguyen",
    address: "Mirpur DOHS, Dhaka",
    driver: "Robert Smith",
    vehicle: "Pickup Truck - P205",
    deliveryCost: 18.50,
    status: "Completed",
    date: "11 Oct 2026"
  }
];

export default function CompletedDeliveriesPage() {
  const [deliveries] = useState<Delivery[]>(initialDeliveries);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeliveries = deliveries.filter(d => 
    d.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Completed Deliveries</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review full logs of dispatched and completed shipments</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* Search bar */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by invoice, customer, driver..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Table wrapper */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="overflow-x-auto max-h-[450px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                <tr>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Invoice</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Customer</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Address</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Driver</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Vehicle</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Cost</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Completion Date</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.invoice} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">{delivery.invoice}</td>
                    <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{delivery.customer}</td>
                    <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground/75 shrink-0" />
                        {delivery.address}
                      </span>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        {delivery.driver}
                      </span>
                    </td>
                    <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">{delivery.vehicle}</td>
                    <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">${delivery.deliveryCost.toFixed(2)}</td>
                    <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">{delivery.date}</td>
                    <td className="px-4 py-1.5 whitespace-nowrap text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="w-3 h-3" />
                        {delivery.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredDeliveries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      No completed deliveries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
