import { AuthForm } from "@/features/auth/components/auth-form";

const AuthPage = () => (
  <div className="h-full flex items-center justify-center bg-[#5C3B58]">
    <div className="md:h-auto md:w-[420px]">
      <AuthForm />;
    </div>
  </div>
);

export default AuthPage;
