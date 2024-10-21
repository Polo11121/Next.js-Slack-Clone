import { PropsWithChildren } from "react";
import { WorkspaceSidebar } from "@/features/workspaces/components/workspace-sidebar";
import { Sidebar } from "@/features/workspaces/components/sidebar";
import { Toolbar } from "@/features/workspaces/components/toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const WorkspaceIdLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <div className="h-full ">
    <Toolbar />
    <div className="flex h-[calc(100vh-40px)]">
      <Sidebar />
      <ResizablePanelGroup
        direction="horizontal"
        autoSaveId="mj-workspace-layout"
      >
        <ResizablePanel defaultSize={20} minSize={11} className="bg-[#5E2C5F]">
          <WorkspaceSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </div>
);

export default WorkspaceIdLayout;
