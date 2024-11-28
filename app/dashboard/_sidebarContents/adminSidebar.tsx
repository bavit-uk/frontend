import { LayoutDashboard, Users, Building2, Car, Globe, Wrench, Shield, Target, ShoppingCart, Landmark, Wallet, Calculator, MessageSquare, Settings  } from "lucide-react";

interface NavItem {
    title: string;
    icon: React.ElementType;
    href: string;
    children?: NavItem[];
}

export const adminsidebar: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    {
        title: "User Management",
        icon: Users,
        href: "/users",
        children: [
            { title: "Add User", icon: Users, href: "/dashboard/user-management/add-user" },
            // { title: "View User", icon: Users, href: "/dashboard/suplier_management/suplier_list" },
            { title: "View User", icon: Users, href: "/dashboard/user-management/view-user" },
            { title: "Add Category", icon: Users, href: "/dashboard/user-management/add-category" },
            { title: "View Category", icon: Users, href: "/dashboard/user-management/view-category" },
        ],
    },
    {
        title: "Supplier Management",
        icon: Users,
        href: "/supliermanagement",
        children: [
            { title: "Add Supplier", icon: Users, href: "/dashboard/suplier-management/add_supplier" },
            { title: "Supplier List", icon: Users, href: "/dashboard/suplier-management/suplier_list" },
            { title: " Add Supplier Categories", icon: Users, href: "/dashboard/suplier-management/add-supplier-categories" },
        ],
    },
    
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];
