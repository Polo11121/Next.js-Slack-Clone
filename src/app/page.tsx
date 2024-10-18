"use client";

import { useEffect, useMemo } from "react";
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaces();
  const { open, isOpen } = useCreateWorkspaceModal();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!isOpen) {
      open();
    }
  }, [workspaceId, isLoading, open, isOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default HomePage;
