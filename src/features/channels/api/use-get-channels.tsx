import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

export const useGetChannels = (workspaceId: Id<"workspaces">) => {
  const data = useQuery(api.channels.get, { workspaceId: workspaceId });

  const isLoading = data === undefined;

  return { data, isLoading };
};
