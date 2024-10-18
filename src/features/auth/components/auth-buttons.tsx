import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type AuthButtonsProps = {
  isPending: boolean;
  signInWithGoogle: () => void;
  signInWithGithub: () => void;
};

export const AuthButtons = ({
  isPending,
  signInWithGithub,
  signInWithGoogle,
}: AuthButtonsProps) => (
  <>
    <Button
      variant="outline"
      className="relative"
      size="lg"
      disabled={isPending}
      onClick={signInWithGoogle}
    >
      <FcGoogle className="size-5 absolute top-3 left-2.5" />
      Continue with Google
    </Button>
    <Button
      variant="outline"
      className="relative"
      size="lg"
      disabled={isPending}
      onClick={signInWithGithub}
    >
      <FaGithub className="size-5 absolute top-3 left-2.5" />
      Continue with Github
    </Button>
  </>
);
