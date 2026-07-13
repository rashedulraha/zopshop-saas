import { create } from "zustand";

interface SidebarState {
  isOpen: boolean; // Mobile open state
  isCollapsed: boolean; // Desktop collapsed state
  toggle: () => void;
  close: () => void;
  open: () => void;
  toggleCollapse: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
