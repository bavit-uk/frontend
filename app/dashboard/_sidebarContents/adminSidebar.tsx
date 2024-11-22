import { LayoutDashboard, Users, Building2, Car, Globe, Wrench, Shield, Target, ShoppingCart, Landmark, Wallet, Calculator, MessageSquare,  } from "lucide-react";

interface NavItem {
    title: string;
    icon: React.ElementType;
    href: string;
    children?: NavItem[];
}

export const adminsidebar: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    {
        title: "Supplier Management",
        icon: Users,
        href: "/users",
        children: [
            { title: "Add Supplier", icon: Users, href: "/dashboard/suplier_management/add_supplier" },
            { title: "Supplier List", icon: Users, href: "/dashboard/suplier_management/suplier_list" },
            { title: " Add Supplier Categories", icon: Users, href: "/dashboard/suplier_management/add-supplier-categories" },
        ],
    },
    { title: "View Dealerships", icon: Building2, href: "/dealerships" },
    {
        title: "Vehicles",
        icon: Car,
        href: "/vehicles",
        children: [
            { title: "Add Vehicle", icon: Car, href: "/vehicles/add" },
            { title: "Vehicle List", icon: Car, href: "/vehicles/list" },
        ],
    },
    { title: "Website Management", icon: Globe, href: "/website" },
    { title: "View Services", icon: Wrench, href: "/services" },
    {
        title: "Warranty",
        icon: Shield,
        href: "/warranty",
        children: [
            { title: "Add Warranty", icon: Shield, href: "/warranty/add" },
            { title: "Warranty List", icon: Shield, href: "/warranty/list" },
        ],
    },
    {
        title: "Leads",
        icon: Target,
        href: "/leads",
        children: [
            { title: "Add Lead", icon: Target, href: "/leads/add" },
            { title: "Lead List", icon: Target, href: "/leads/list" },
        ],
    },
    { title: "Orders", icon: ShoppingCart, href: "/orders" },
    { title: "Lenders", icon: Landmark, href: "/lenders" },
    { title: "Payments", icon: Wallet, href: "/payments" },
    {
        title: "Accounting",
        icon: Calculator,
        href: "/accounting",
        children: [
            { title: "Invoices", icon: Calculator, href: "/accounting/invoices" },
            { title: "Expenses", icon: Calculator, href: "/accounting/expenses" },
        ],
    },
    { title: "Chat", icon: MessageSquare, href: "/chat" },
];
