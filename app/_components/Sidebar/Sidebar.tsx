"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { adminsidebar } from "@/app/dashboard/_sidebarContents/adminSidebar";
import { useAppSelector, useAppDispatch } from "@/app/store/hook";
import { client } from "@/app/_utils/axios";
import { setUserPermissions } from "@/app/store/slices/userPermissions";
import { changeState } from "@/app/store/slices/sidebar";
import { AxiosError } from 'axios'; // Import the AxiosError type from axios
import { toast } from "react-toastify";

export default function Sidebar() {
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);
  const permissions = useAppSelector((state) => state.userPermissions.permissions);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  // Toggle submenu open/close
  const toggleSubmenu = (href: string) => {
    setOpenSubmenus((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]));
  };

  // Filter sidebar items based on permissions
  const filterSidebar = (items: typeof adminsidebar): typeof adminsidebar => {
    return items
      .filter((item) => !item.permission || permissions.includes(item.permission))
      .map((item) => ({
        ...item,
        children: item.children ? filterSidebar(item.children) : undefined,
      }));
  };

  const filteredSidebar = filterSidebar(adminsidebar);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await client.get("auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        const data = response.data.user.userType.permissions;
        console.log("permissions : ", data);
        dispatch(setUserPermissions(data));
      } catch (error) {
        console.log("This error is inside fetch permission catch");

        // Assert the error type to AxiosError
        if ((error as AxiosError).response) {
          const axiosError = error as AxiosError;

          // Check if the error is a 401 Unauthorized error
          if (axiosError.response?.status === 401) {
            console.error("Unauthorized: Redirecting to login...");
            localStorage.removeItem("accessToken");
            toast.info("Session Expired. Please log in again.");
            window.location.href = "/login"; // Redirect to login page
          } else {
            console.error("Failed to fetch permissions:", axiosError);
          }
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
    };

    fetchPermissions();
  }, [dispatch]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    toast.success("Logged out successfully"); // Show success message
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="relative min-h-screen">
      <div className={`fixed inset-y-0 left-0 pt-4 z-40 flex flex-col bg-[#1e2837] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && <span className="text-lg font-semibold text-white">Admin Panel</span>}
          <button
            className="block rounded-md p-1.5 text-gray-400 hover:bg-gray-700"
            onClick={() => dispatch(changeState())}
          >
            {collapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {filteredSidebar.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <button
                  className={`group flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white transition-colors ${pathname === item.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"} ${collapsed ? "justify-center" : "justify-between"}`}
                  onClick={() => toggleSubmenu(item.href)}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`h-5 w-5 ${collapsed ? "h-6 w-6" : ""}`} />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenus.includes(item.href) ? "rotate-180" : ""}`} />
                  )}
                </button>
              ) : (
                <Link href={item.href}>
                  <div
                    className={`group flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white transition-colors ${pathname === item.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"} ${collapsed ? "justify-center" : "justify-between"}`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className={`h-5 w-5 ${collapsed ? "h-6 w-6" : ""}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                  </div>
                </Link>
              )}

              {item.children && openSubmenus.includes(item.href) && !collapsed && (
                <div className="mt-2 space-y-1 pl-11">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <div
                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-white transition-colors ${pathname === child.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"}`}
                      >
                        {child.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button at the bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-red-600 transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
