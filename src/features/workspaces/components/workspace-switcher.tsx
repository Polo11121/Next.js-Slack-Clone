"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const { id } = useWorkspaceId();
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace(id);
  const { data: workspaces } = useGetWorkspaces();
  const { open } = useCreateWorkspaceModal();
  const router = useRouter();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== id
  );
  const activeWorkspaceFirstLetter = workspace?.name.charAt(0).toUpperCase();

  const goToActiveWorkspace = () => router.push(`/workspaces/${id}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {isWorkspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            activeWorkspaceFirstLetter
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="cursor-pointer flex-col justify-start items-center capitalize"
          onClick={goToActiveWorkspace}
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map(({ _id, name }) => {
          const goToWorkspace = () => router.push(`/workspaces/${_id}`);
          const workspaceFirstLetter = name.charAt(0).toUpperCase();

          return (
            <DropdownMenuItem
              key={_id}
              className="cursor capitalize overflow-hidden"
              onClick={goToWorkspace}
            >
              <div className=" shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                {workspaceFirstLetter}
              </div>
              <p className="truncate">{name}</p>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem onClick={open} className="cursor-pointer">
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
