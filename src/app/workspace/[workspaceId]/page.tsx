"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const { id } = useWorkspaceId();
  const { data } = useGetWorkspace(id);

  return <div>Workspace: {data?.name}</div>;
};

export default WorkspaceIdPage;
