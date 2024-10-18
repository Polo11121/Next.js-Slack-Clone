"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export const useAuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const { signIn } = useAuthActions();
  const router = useRouter();

  const toggleAction = () => setIsSignIn((prev) => !prev);

  const changeFormData = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignIn && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsPending(true);
      await signIn("password", {
        email: formData.email,
        password: formData.password,
        ...(isSignIn && { name: formData.name }),
        flow: isSignIn ? "signIn" : "signUp",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      setError(isSignIn ? "Invalid email or password" : "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const signInWith = async (provider: string) => {
    try {
      setIsPending(true);
      await signIn(provider);
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const signInWithGithub = () => signInWith("github");
  const signInWithGoogle = () => signInWith("google");

  return {
    signInWithGithub,
    signInWithGoogle,
    changeFormData,
    toggleAction,
    isPending,
    isSignIn,
    formData,
    onSubmit,
    error,
  };
};
