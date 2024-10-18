"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};