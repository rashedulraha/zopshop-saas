"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  CheckCircle,
  Clock,
  Briefcase,
  Activity,
  Check,
  X,
  XCircle,
  LogOut,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  name: string;
  role: string;
  status: "Present" | "Late" | "Absent" | "On Leave";
  checkIn: string;
  checkOut: string;
}

const initialAttendance: AttendanceRecord[] = [];

export default function AttendancePage() {
  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>(initialAttendance);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null,
  );
  const [date, setDate] = useState("13 Oct 2026");

  // Modal Attendance States
  const [status, setStatus] = useState<
    "Present" | "Late" | "Absent" | "On Leave"
  >("Present");
  const [checkIn, setCheckIn] = useState("09:00 AM");
  const [checkOut, setCheckOut] = useState("05:00 PM");

  // Calculate Attendance Stats
  const stats = useMemo(() => {
    const present = attendance.filter((a) => a.status === "Present").length;
    const late = attendance.filter((a) => a.status === "Late").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const leave = attendance.filter((a) => a.status === "On Leave").length;
    const presentTotal = present + late;
    const total = attendance.length;
    const rate = total > 0 ? ((presentTotal / total) * 100).toFixed(0) : "0";

    return { present, late, absent, leave, rate };
  }, [attendance]);

  const handleOpenMarkModal = (rec: AttendanceRecord) => {
    setSelectedRecord(rec);
    setStatus(rec.status);
    setCheckIn(rec.checkIn === "—" ? "09:00 AM" : rec.checkIn);
    setCheckOut(rec.checkOut === "—" ? "05:00 PM" : rec.checkOut);
  };

  const handleMarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    setAttendance(
      attendance.map((rec) =>
        rec.id === selectedRecord.id
          ? {
              ...rec,
              status,
              checkIn:
                status === "Absent" || status === "On Leave" ? "—" : checkIn,
              checkOut:
                status === "Absent" || status === "On Leave" ? "—" : checkOut,
            }
          : rec,
      ),
    );

    setSelectedRecord(null);
  };

  const filteredAttendance = useMemo(() => {
    return attendance.filter(
      (rec) =>
        rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [attendance, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Staff Attendance
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor daily check-ins, leaves, late entries, and timesheets
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary w-40 text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Present
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Late Entries
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Absent
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  On Leave
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Attendance Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Present */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.present}
                  </span>
                </td>

                {/* Late */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.late}
                  </span>
                </td>

                {/* Absent */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.absent}
                  </span>
                </td>

                {/* On Leave */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-slate-500/10 items-center justify-center text-slate-500 mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.leave}
                  </span>
                </td>

                {/* Attendance Rate */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-primary/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.rate}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance log details list */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Attendance Worksheet</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Logs of daily attendance checking statuses, timestamps, and
              markings.
            </p>
          </div>

          {/* Search bar inside Card */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Staff Name</th>
                <th className="px-4 py-2 font-semibold">Designation / Role</th>
                <th className="px-4 py-2 font-semibold text-center">
                  Check-In Time
                </th>
                <th className="px-4 py-2 font-semibold text-center">
                  Check-Out Time
                </th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAttendance.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6.5 h-6.5 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px] uppercase shrink-0">
                        {rec.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </div>
                      <span>{rec.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {rec.role}
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
                    <div className="inline-flex items-center gap-1 font-mono">
                      <LogIn className="w-3 h-3 text-emerald-500 opacity-60" />{" "}
                      {rec.checkIn}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
                    <div className="inline-flex items-center gap-1 font-mono">
                      <LogOut className="w-3 h-3 text-rose-500 opacity-60" />{" "}
                      {rec.checkOut}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                        rec.status === "Present" &&
                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                        rec.status === "Late" &&
                          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                        rec.status === "Absent" &&
                          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                        rec.status === "On Leave" &&
                          "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1 h-1 rounded-full",
                          rec.status === "Present" && "bg-emerald-500",
                          rec.status === "Late" && "bg-amber-500",
                          rec.status === "Absent" && "bg-rose-500",
                          rec.status === "On Leave" && "bg-slate-500",
                        )}
                      />
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleOpenMarkModal(rec)}
                      className="h-7 px-3 rounded bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-[10px] inline-flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Status</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAttendance.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No staff records match search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mark Attendance Modal Dialog */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedRecord(null)}
          />

          {/* Modal Container */}
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Update Daily Status
                </h3>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  Mark check-in log for {selectedRecord.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleMarkSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Employee Name
                </span>
                <span className="text-sm font-semibold text-foreground px-3 py-1.5 rounded-md bg-muted/40 border border-border/60">
                  {selectedRecord.name}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Attendance Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late Entry</option>
                  <option value="Absent">Absent</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              {(status === "Present" || status === "Late") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Check-In Time
                    </label>
                    <input
                      type="text"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Check-Out Time
                    </label>
                    <input
                      type="text"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
