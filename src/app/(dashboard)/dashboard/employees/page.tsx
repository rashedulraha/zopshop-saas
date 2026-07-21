"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle,
  Briefcase,
  Layers,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  salary: number;
  joinDate: string;
  status: "Active" | "Inactive";
}

const initialEmployees: Employee[] = [];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  // Aggregate stats
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "Active").length;
    const monthlyPayroll = employees.reduce(
      (sum, curr) => sum + curr.salary,
      0,
    );
    const avgSalary = total > 0 ? Math.round(monthlyPayroll / total) : 0;

    return { total, active, monthlyPayroll, avgSalary };
  }, [employees]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !phone || !email || !salary || !joinDate) return;

    const parsedSalary = parseFloat(salary) || 0;

    if (editingEmployee) {
      // Editing Mode
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                name,
                role,
                phone,
                email,
                salary: parsedSalary,
                joinDate,
                status,
              }
            : emp,
        ),
      );
      setEditingEmployee(null);
    } else {
      // Add Mode
      const newEmployee: Employee = {
        id: `EMP-00${employees.length + 1}`,
        name,
        role,
        phone,
        email,
        salary: parsedSalary,
        joinDate,
        status,
      };
      setEmployees([newEmployee, ...employees]);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setName(employee.name);
    setRole(employee.role);
    setPhone(employee.phone);
    setEmail(employee.email);
    setSalary(employee.salary.toString());
    setJoinDate(employee.joinDate);
    setStatus(employee.status);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setPhone("");
    setEmail("");
    setSalary("");
    setJoinDate("");
    setStatus("Active");
    setEditingEmployee(null);
  };

  // Search Filter
  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [employees, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Employee Directory
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review staffing roster, salary contracts, and manage profiles
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-162.5 md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Total Staff
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Active Roster
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Monthly Payroll
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Avg Salary
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Total Employees */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total}
                  </span>
                </td>

                {/* Active Staff */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.active}
                  </span>
                </td>

                {/* Monthly Payroll */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.monthlyPayroll.toLocaleString()}
                  </span>
                </td>

                {/* Avg Salary */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.avgSalary.toLocaleString()}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roster list */}
      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
        {/* Search & filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, role, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Roster table */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/10 uppercase border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                <tr>
                  <th className="px-4 py-2 font-medium w-[22%] whitespace-nowrap">
                    Employee
                  </th>
                  <th className="px-4 py-2 font-medium w-[18%] whitespace-nowrap">
                    Role / Designation
                  </th>
                  <th className="px-4 py-2 font-medium w-[22%]">
                    Contact Info
                  </th>
                  <th className="px-4 py-2 font-medium w-[13%] whitespace-nowrap">
                    Join Date
                  </th>
                  <th className="px-4 py-2 font-medium w-[12%] whitespace-nowrap">
                    Monthly Salary
                  </th>
                  <th className="px-4 py-2 font-medium w-[10%] text-center">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium w-[10%] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs uppercase shrink-0">
                          {emp.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">
                            {emp.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {emp.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                      {emp.role}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3 text-muted-foreground" />{" "}
                          {emp.phone}
                        </span>
                        <span className="text-[10px] flex items-center gap-1">
                          <Mail className="w-3 h-3 text-muted-foreground" />{" "}
                          {emp.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{emp.joinDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap font-mono">
                      $
                      {emp.salary.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                          emp.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                        )}>
                        <span
                          className={cn(
                            "w-1 h-1 rounded-full",
                            emp.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-rose-500",
                          )}
                        />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit Profile">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="p-1 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                          title="Remove Staff">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-muted-foreground">
                      No staff profiles match search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Add/Edit Employee */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setIsFormOpen(false);
              resetForm();
            }}
          />

          {/* Modal Container */}
          <div className="relative border border-border bg-card rounded-md max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {editingEmployee
                    ? "Edit Employee Profile"
                    : "Register New Employee"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {editingEmployee
                    ? "Modify employee details and payroll configurations."
                    : "Fill in personal and payroll parameters for the new employee."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-md transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Employee Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Designation / Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Role / Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Warehouse Lead"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1700-000000"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. employee@zopshop.com"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Base Salary */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Monthly Salary ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      required
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. 1000"
                      className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Join Date
                  </label>
                  <input
                    type="text"
                    required
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    placeholder="e.g. 15 Jan 2025"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Roster Status
                  </label>
                  <div className="flex gap-4 mt-1.5">
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="radio"
                        checked={status === "Active"}
                        onChange={() => setStatus("Active")}
                        className="accent-primary"
                      />
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />{" "}
                        Active Roster
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="radio"
                        checked={status === "Inactive"}
                        onChange={() => setStatus("Inactive")}
                        className="accent-primary"
                      />
                      <span className="flex items-center gap-1">
                        <UserX className="w-3.5 h-3.5 text-rose-500" /> Inactive
                        / On Leave
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors">
                  {editingEmployee ? "Update Employee" : "Register Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
