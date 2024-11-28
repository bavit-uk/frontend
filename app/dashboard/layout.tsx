"use client";
import Sidebar from "../_components/Sidebar/Sidebar";
// import { changeState } from "../store/slices/sidebar";
import { useAppSelector } from "@/app/store/hook";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);
  // const dispatch = useAppDispatch();
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      {/* <div>{children}</div> */}
      <main
        className={`min-h-screen flex-grow  transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}
      >
        {children}
      </main>
    </div>
  );
}
