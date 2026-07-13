"use client";

import { useState } from "react";
import { 
  Truck, Search, Filter, Edit3, CheckCircle2, 
  MapPin, User, DollarSign, Calendar, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Delivery {
  invoice: string;
  customer: string;
  address: string;
  driver: string;
  vehicle: string;
  deliveryCost: number;
  status: "Pending" | "On the way";
  date: string;
}

const initialDeliveries: Delivery[] = [
  {
    invoice: "INV-1002",
    customer: "Jackson Lee",
    address: "Sector 4, Uttara, Dhaka",
    driver: "Unassigned",
    vehicle: "Unassigned",
    deliveryCost: 15.00,
    status: "Pending",
    date: "14 Oct 2026"
  },
  {
    invoice: "INV-0985",
    customer: "Sofia Davis",
    address: "Road 12, Dhanmondi, Dhaka",
    driver: "John Doe",
    vehicle: "Covered Van - V102",
    deliveryCost: 20.00,
    status: "On the way",
    date: "13 Oct 2026"
  },
  {
    invoice: "INV-0988",
    customer: "Michael Chen",
    address: "Mirpur 10, Dhaka",
    driver: "Unassigned",
    vehicle: "Unassigned",
    deliveryCost: 12.50,
    status: "Pending",
    date: "15 Oct 2026"
  }
];

export default function PendingDeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Dispatch Form States
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || !driver || !vehicle) return;

    setDeliveries(deliveries.map(d => {
      if (d.invoice === selectedInvoice) {
        return {
          ...d,
          driver,
          vehicle,
          status: "On the way"
        };
      }
      return d;
    }));

    setSelectedInvoice(null);
    setDriver("");
    setVehicle("");
  };

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
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Pending Deliveries</h1>
          <p className="text-muted-foreground mt-1 text-sm">Assign drivers, vehicles and dispatch pending warehouse shipments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Deliveries List Table (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
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
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                  <tr>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Invoice</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Customer</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Address</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Driver</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Vehicle</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Cost</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Date</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Status</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredDeliveries.map((delivery) => (
                    <tr key={delivery.invoice} className={cn(
                      "hover:bg-muted/30 transition-colors",
                      delivery.invoice === selectedInvoice && "bg-primary/5"
                    )}>
                      <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">{delivery.invoice}</td>
                      <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{delivery.customer}</td>
                      <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground/75 shrink-0" />
                          {delivery.address}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 whitespace-nowrap">
                        <span className={cn(
                          "inline-flex items-center gap-1",
                          delivery.driver === "Unassigned" ? "text-amber-500 font-medium" : "text-foreground"
                        )}>
                          <User className="w-3.5 h-3.5 shrink-0" />
                          {delivery.driver}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">{delivery.vehicle}</td>
                      <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">${delivery.deliveryCost.toFixed(2)}</td>
                      <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">{delivery.date}</td>
                      <td className="px-4 py-1.5 whitespace-nowrap">
                        <span className={cn(
                          "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                          delivery.status === "On the way" ? "bg-blue-500/10 text-blue-500" : "bg-amber-500/10 text-amber-500"
                        )}>{delivery.status}</span>
                      </td>
                      <td className="px-4 py-1.5 whitespace-nowrap text-right">
                        {delivery.status === "Pending" ? (
                          <button
                            onClick={() => setSelectedInvoice(delivery.invoice)}
                            className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded hover:bg-primary/90 transition-colors"
                          >
                            Dispatch
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground font-medium">Dispatched</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredDeliveries.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                        No pending shipments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel Dispatch form (4 cols) */}
        <div className="lg:col-span-4">
          {selectedInvoice ? (
            <div className="border border-border bg-card p-5 rounded-md flex flex-col gap-4 animate-in slide-in-from-right duration-200">
              <div className="border-b border-border pb-3">
                <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Dispatch Invoice {selectedInvoice}</span>
                </h3>
              </div>

              <form onSubmit={handleDispatch} className="space-y-4">
                {/* Driver */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assign Driver</label>
                  <select
                    required
                    value={driver}
                    onChange={e => setDriver(e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option value="">Select Driver</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Robert Smith">Robert Smith</option>
                    <option value="David Miller">David Miller</option>
                  </select>
                </div>

                {/* Vehicle */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assign Vehicle</label>
                  <select
                    required
                    value={vehicle}
                    onChange={e => setVehicle(e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option value="">Select Vehicle</option>
                    <option value="Covered Van - V102">Covered Van - V102</option>
                    <option value="Pickup Truck - P205">Pickup Truck - P205</option>
                    <option value="Motorcycle - M55">Motorcycle - M55</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(null)}
                    className="flex-1 py-1.5 border border-border bg-card rounded-md text-xs font-semibold hover:bg-muted/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-xs font-semibold transition-colors"
                  >
                    Dispatch Cargo
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="border border-border bg-card p-5 rounded-md flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="w-8 h-8 text-muted-foreground/60 mb-3" />
              <span className="text-sm font-medium text-foreground">Select a pending delivery</span>
              <span className="text-xs text-muted-foreground mt-1 max-w-[200px]">Click the "Dispatch" button on a pending row to assign cargo logistics.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
