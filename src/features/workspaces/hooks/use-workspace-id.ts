"use client";

import { useParams } from "next/navigation";
import { Id } from "@/../convex/_generated/dataModel";

export const useWorkspaceId = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return { id: workspaceId as Id<"workspaces"> };
};
