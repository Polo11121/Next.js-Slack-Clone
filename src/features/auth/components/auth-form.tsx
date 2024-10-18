"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthForm } from "@/features/auth/hooks/use-auth-form";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { TriangleAlert } from "lucide-react";

export const AuthForm = () => {
  const {
    signInWithGithub,
    signInWithGoogle,
    changeFormData,
    toggleAction,
    isPending,
    onSubmit,
    isSignIn,
    formData,
    error,
  } = useAuthForm();

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{isSignIn ? "Login" : "Sign up"} to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="flex flex-col gap-y-2.5 px-0 pb-0">
        <form className="flex flex-col gap-y-2.5" onSubmit={onSubmit}>
          {!isSignIn && (
            <Input
              disabled={false}
              onChange={changeFormData}
              value={formData.name}
              required
              placeholder="Name"
              name="name"
            />
          )}
          <Input
            disabled={false}
            onChange={changeFormData}
            value={formData.email}
            required
            type="email"
            placeholder="Email"
            name="email"
          />
          <Input
            disabled={false}
            onChange={changeFormData}
            value={formData.password}
            required
            type="password"
            placeholder="Password"
            name="password"
          />
          {!isSignIn && (
            <Input
              disabled={false}
              onChange={changeFormData}
              value={formData.confirmPassword}
              required
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
            />
          )}
          <Button type="submit" size="lg" disabled={isPending}>
            Continue
          </Button>
        </form>
        <Separator />
        <AuthButtons
          isPending={isPending}
          signInWithGithub={signInWithGithub}
          signInWithGoogle={signInWithGoogle}
        />
        <p className="text-xs text-muted-foreground">
          {isSignIn ? "Don`t" : "Already"} have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={toggleAction}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
