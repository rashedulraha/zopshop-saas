import { api } from "../axios";

export interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  salary: number;
}

export const hrApi = {
  /**
   * List employees
   * GET /api/employees
   */
  getAllEmployees: async (): Promise<Employee[]> => {
    const { data } = await api.get<{ employees: Employee[] }>("/employees");
    return data.employees;
  },

  /**
   * Create employee
   * POST /api/employees
   */
  createEmployee: async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const { data } = await api.post<{ employee: Employee }>("/employees", employeeData);
    return data.employee;
  },

  /**
   * Mark attendance
   * POST /api/employees/attendance
   */
  markAttendance: async (attendanceData: { employeeId: string; status: "PRESENT" | "ABSENT" | "LATE"; date: string }): Promise<unknown> => {
    const { data } = await api.post("/employees/attendance", attendanceData);
    return data;
  },

  /**
   * Pay salary
   * POST /api/employees/salary
   */
  paySalary: async (paymentData: { employeeId: string; amount: number; month: string }): Promise<unknown> => {
    const { data } = await api.post("/employees/salary", paymentData);
    return data;
  },
};
