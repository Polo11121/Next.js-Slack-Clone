"use client";

import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher";
import { UserButton } from "@/features/auth/components/user-button";
import { SidebarButton } from "@/features/workspaces/components/sidebar-button";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
      <WorkspaceSwitcher />
      <SidebarButton
        Icon={Home}
        label="Home"
        isActive={pathname.includes("workspace")}
      />
      <SidebarButton Icon={MessagesSquare} label="DMs" />
      <SidebarButton Icon={Bell} label="Activity" />
      <SidebarButton Icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto ">
        <UserButton />
      </div>
    </aside>
  );
};
