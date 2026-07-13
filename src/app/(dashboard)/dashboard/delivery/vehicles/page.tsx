"use client";

import { useState, useMemo } from "react";
import { Plus, Search, CheckCircle, AlertTriangle, Truck, Shield, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  driver: string;
  status: "Available" | "Transit" | "Maintenance";
  capacity: string;
}

const initialVehicles: Vehicle[] = [
  { id: "VEH-01", plateNumber: "DHAKA METRO-T-11-2233", model: "Toyota TownAce", driver: "Karim Khan", status: "Transit", capacity: "800 kg" },
  { id: "VEH-02", plateNumber: "DHAKA METRO-T-12-4455", model: "Hyundai H-100", driver: "John Doe", status: "Available", capacity: "1.2 Ton" },
  { id: "VEH-03", plateNumber: "DHAKA METRO-T-14-7788", model: "Suzuki Carry", driver: "Unassigned", status: "Maintenance", capacity: "500 kg" }
];

export default function DeliveryVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");
  const [driver, setDriver] = useState("");
  const [status, setStatus] = useState<"Available" | "Transit" | "Maintenance">("Available");
  const [capacity, setCapacity] = useState("");

  const stats = useMemo(() => {
    const total = vehicles.length;
    const available = vehicles.filter((v) => v.status === "Available").length;
    const transit = vehicles.filter((v) => v.status === "Transit").length;
    return { total, available, transit };
  }, [vehicles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber || !model || !capacity) return;

    const newVehicle: Vehicle = {
      id: `VEH-0${vehicles.length + 1}`,
      plateNumber: plateNumber.toUpperCase(),
      model,
      driver: driver || "Unassigned",
      status,
      capacity
    };

    setVehicles([...vehicles, newVehicle]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setPlateNumber("");
    setModel("");
    setDriver("");
    setStatus("Available");
    setCapacity("");
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(
      (v) =>
        v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driver.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [vehicles, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Delivery Vehicles</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage logistics fleets, capacity tracking, and dispatch driver rosters</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Logistics Fleet</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Available Fleet</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Out on Transit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Trucks
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    {stats.available} Available
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.transit} Transit
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vehicles by plate or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Vehicle ID</th>
                <th className="px-4 py-2 font-semibold">Plate Number</th>
                <th className="px-4 py-2 font-semibold">Model / Make</th>
                <th className="px-4 py-2 font-semibold">Driver Assigned</th>
                <th className="px-4 py-2 font-semibold text-center">Payload Capacity</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{v.id}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{v.plateNumber}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{v.model}</td>
                  <td className="px-4 py-3 text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{v.driver}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-foreground font-bold font-mono">{v.capacity}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      v.status === "Available" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                      v.status === "Transit" && "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
                      v.status === "Maintenance" && "bg-rose-500/10 text-rose-600 border-rose-500/20"
                    )}>
                      <span className={cn(
                        "w-1 h-1 rounded-full",
                        v.status === "Available" ? "bg-emerald-500" : v.status === "Transit" ? "bg-indigo-500" : "bg-rose-500"
                      )} />
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-base font-semibold text-foreground">Add New Fleet Vehicle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Plate Number</label>
                <input
                  type="text"
                  required
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="e.g. DHAKA METRO-T-11-2233"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none uppercase"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Model / Make</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Toyota TownAce"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Assigned Driver</label>
                  <input
                    type="text"
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                    placeholder="e.g. Karim Khan"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Payload Capacity</label>
                  <input
                    type="text"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 800 kg"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Fleet Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Transit">On Transit</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm hover:bg-muted/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold"
                >
                  Log Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
