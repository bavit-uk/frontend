import { LayoutDashboard, Users, Settings  } from "lucide-react";


interface NavItem {
    title: string;
    icon: React.ElementType;
    href: string;
    permission?: string;
    children?: NavItem[];
}

// ! Make sure these permissions match exactly with backend permissions
export const adminsidebar: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" , permission: "DASHBOARD"},
    {
        title: "User Management",
        icon: Users,
        href: "/users",
        permission:"MANAGE_USERS",
        children: [
            { title: "Add Category", icon: Users, href: "/dashboard/user-management/add-category" , permission: "ADD_CATEGORY"},
            { title: "View Category", icon: Users, href: "/dashboard/user-management/view-category" , permission: "VIEW_CATEGORY"},
            { title: "Add User", icon: Users, href: "/dashboard/user-management/add-user" , permission: "ADD_USER" },
            // { title: "View User", icon: Users, href: "/dashboard/suplier_management/suplier_list" },
            { title: "View User", icon: Users, href: "/dashboard/user-management/view-user" , permission: "VIEW_USER"},
            { title: "Add Category", icon: Users, href: "/dashboard/user-management/add-category" , permission: "ADD_CATEGORY"},
            // { title: "View Category", icon: Users, href: "/dashboard/user-management/view-category" , permission: "VIEW_CATEGORY"},
        ],
    },
    {
        title: "Supplier Management",
        icon: Users,
        href: "/supliermanagement",
        permission:"MANAGE_SUPPLIERS",
        children: [
            { title: " Add Supplier Category", icon: Users, permission:"ADD_SUPPLIERS_CATEGORY",  href: "/dashboard/suplier-management/add-supplier-categories" },
            { title: "Add Supplier", icon: Users, href: "/dashboard/suplier-management/add_supplier" , permission:"ADD_SUPPLIERS", },
            { title: "View Supplier", icon: Users, href: "/dashboard/suplier-management/suplier_list" , permission:"VIEW_SUPPLIERS", },
        ],
    },
    
    { title: "Settings", icon: Settings, href: "/dashboard/settings" , permission: "SETTINGS" },
];
