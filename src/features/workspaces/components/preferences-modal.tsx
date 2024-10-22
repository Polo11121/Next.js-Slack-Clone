"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";

type PreferencesModalProps = {
  open: boolean;
  toggleModalVisibility: () => void;
  initialValue: string;
};

export const PreferencesModal = ({
  open,
  toggleModalVisibility,
  initialValue,
}: PreferencesModalProps) => {
  const { id } = useWorkspaceId();
  const [isEdit, setIsEdit] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { mutate: updateWorkspace, isPending: isUpdatePending } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovePending } =
    useRemoveWorkspace();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete workspace",
    "Are you sure you want to delete this workspace?"
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const onRemove = async () => {
    const ok = await confirm();

    if (ok) {
      removeWorkspace(
        { id },
        {
          onError: () => toast.error("Failed to remove workspace"),
          onSuccess: () => {
            toast.success("Workspace removed successfully");
            router.replace("/");
          },
        }
      );
    }
  };

  const onUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateWorkspace(
      { id, name: value },
      {
        onError: () => toast.error("Failed to update workspace"),
        onSuccess: () => {
          toast.success("Workspace updated successfully");
          setIsEdit(false);
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={toggleModalVisibility}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            {
              <Dialog open={isEdit} onOpenChange={setIsEdit}>
                <DialogTrigger asChild>
                  <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Workspace name</p>
                      <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                        Edit
                      </p>
                    </div>
                    <p className="text-sm">{initialValue}</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename this workspace</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={onUpdate}>
                    <Input
                      value={value}
                      disabled={isUpdatePending}
                      onChange={onChangeName}
                      required
                      autoFocus
                      minLength={3}
                      maxLength={80}
                      placeholder="Workspace name e.g. 'Work', 'Personal', 'Home"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isUpdatePending}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button disabled={isUpdatePending} type="submit">
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            }
            <button
              disabled={isRemovePending}
              onClick={onRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <Trash className="size-4" />
              <p className="text-sm font-semibold">Delete workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmDialog />
    </>
  );
};
