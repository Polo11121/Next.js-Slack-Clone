"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const [name, setName] = useState("");
  const { close, isOpen } = useCreateWorkspaceModal();
  const { mutate, isPending } = useCreateWorkspace();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSuccess = (workspaceId: string | null) => {
    close();
    toast.success("Workspace created successfully!");
    router.push(`/workspace/${workspaceId}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ name }, { onSuccess });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={handleChange}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal'q 'Home'"
          />
          <div className="flex justify-end ">
            <Button disabled={isPending || !name}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
