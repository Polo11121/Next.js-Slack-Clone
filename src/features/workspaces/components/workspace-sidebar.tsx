import React from "react";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-get-current-member";
import { useGetWorkspace } from "@/features/workspaces//api/use-get-workspace";
import { WorkspaceHeader } from "@/features/workspaces/components/workspace-header";
import { AlertTriangle, Loader } from "lucide-react";

export const WorkspaceSidebar = () => {
  const { id: workspaceId } = useWorkspaceId();
  const { data: currentMember, isLoading: isCurrentMemberLoading } =
    useCurrentMember(workspaceId);
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace(workspaceId);

  if (isCurrentMemberLoading || isWorkspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !currentMember) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#4E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={currentMember.role === "admin"}
      />
    </div>
  );
};
