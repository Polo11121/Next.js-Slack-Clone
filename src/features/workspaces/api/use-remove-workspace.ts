import { useCallback, useMemo, useState } from "react";
import { Id } from "@/../convex/_generated/dataModel";
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";

type RequestType = {
  id: Id<"workspaces">;
};

type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useRemoveWorkspace = () => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "settled"
  >("idle");

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const isError = useMemo(() => status === "error", [status]);

  const mutation = useMutation(api.workspaces.remove);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      setData(null);
      setError(null);
      setStatus("pending");

      try {
        const response = await mutation(values);

        options?.onSuccess?.(response);

        setData(response);
        setStatus("success");

        return response;
      } catch (error) {
        setStatus("error");
        setError(error as Error);

        options?.onError?.(error as Error);

        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");

        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    isPending,
    isSuccess,
    isSettled,
    isError,
    status,
    error,
  };
};
