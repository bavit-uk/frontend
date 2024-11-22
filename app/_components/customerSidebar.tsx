import { sidebarLink } from "@/app/_types/sidebarLink";
import {
  LayoutDashboard,
  ShoppingCart,
  BadgeAlert,
  Star,
  DollarSign,
  Settings,
  MessageCircleMore,
} from "lucide-react";

export const customerSidebarContent: sidebarLink[] = [
  {
    label: "Dashboard",
    link: "/dashboard",
    Icon: <LayoutDashboard />,
    isShowing: true,
  },

  {
    label: "Orders",
    link: "/dashboard/orders",
    Icon: <ShoppingCart />,
    isShowing: true,
  },
  {
    label: "Complaints",
    Icon: <BadgeAlert />,
    link: "/dashboard/complaints",
    isShowing: true,
    links: [
      {
        label: "Add Complaint",
        Icon: <BadgeAlert />,
        link: "/dashboard/add-complaint",
        isShowing: true,
      },
      {
        label: "View Complaints",
        Icon: <BadgeAlert />,
        link: "/dashboard/view-complaints",
        isShowing: true,
      },
    ],
  },
  {
    label: "Reviews",
    Icon: <Star />,
    isShowing: true,
    link: "/dashboard/reviews",
    links: [
      {
        label: "Add Review",
        Icon: <Star />,
        link: "/dashboard/add-review",
        isShowing: true,
      },
      {
        label: "View Reviews",
        Icon: <Star />,
        link: "/dashboard/view-reviews",
        isShowing: true,
      },
    ],
  },
  {
    label: "Payments",
    link: "/dashboard/payments",
    Icon: <DollarSign />,
    isShowing: true,
  },
  {
    label: "Chat",
    Icon: <MessageCircleMore />,
    link: "/dashboard/chat",
    isShowing: true,
  },
  {
    label: "Settings",
    Icon: <Settings />,
    link: "/dashboard/settings",
    isShowing: true,
  },
];
