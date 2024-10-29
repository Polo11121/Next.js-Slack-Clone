"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetCurrentMember } from "@/features/members/api/use-get-current-member";
import { useGetWorkspace } from "@/features/workspaces//api/use-get-workspace";
import { WorkspaceHeader } from "@/features/workspaces/components/workspace-header";
import { SidebarItem } from "@/features/workspaces/components/sidebar-item";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "@/features/workspaces/components/workspace-section";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { UserItem } from "@/features/workspaces/components/user-item";

export const WorkspaceSidebar = () => {
  const { id: workspaceId } = useWorkspaceId();
  const { data: currentMember, isLoading: isCurrentMemberLoading } =
    useGetCurrentMember(workspaceId);
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace(workspaceId);
  const { data: channels, isLoading: isChannelsLoading } =
    useGetChannels(workspaceId);
  const { data: members, isLoading: isMembersLoading } =
    useGetMembers(workspaceId);

  if (
    isCurrentMemberLoading ||
    isWorkspaceLoading ||
    isChannelsLoading ||
    isMembersLoading
  ) {
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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" Icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" Icon={SendHorizontal} id="drafts" />
      </div>
      <WorkspaceSection label="Channels" hint="New channel" onNew={() => {}}>
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            label={item.name}
            Icon={HashIcon}
            id={item._id}
            variant={item._id === "general" ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct Messages"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item?._id}
            id={item._id}
            image={item.user.image}
            label={item.user.name}
          />
        ))}{" "}
      </WorkspaceSection>
    </div>
  );
};
