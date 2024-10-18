"use client";

import { atom, useAtom } from "jotai";

const createWorkspaceModalAtom = atom(false);

export const useCreateWorkspaceModal = () => {
  const [isOpen, setOpen] = useAtom(createWorkspaceModalAtom);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return { isOpen, open, close };
};
