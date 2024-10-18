import { PropsWithChildren } from "react";
import { Sidebar } from "@/features/workspaces/components/sidebar";
import { Toolbar } from "@/features/workspaces/components/toolbar";

const WorkspaceIdLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <div className="h-full ">
    <Toolbar />
    <div className="flex h-[calc(100vh-40px)]">
      <Sidebar />
      {children}
    </div>
  </div>
);

export default WorkspaceIdLayout;
