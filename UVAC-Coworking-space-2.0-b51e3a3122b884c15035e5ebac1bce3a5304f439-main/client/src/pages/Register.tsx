import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";
import { useLocation } from "wouter";

const Register = () => {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center bg-neutral-50 py-12">
      <div className="w-full max-w-md px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm setLocation={setLocation} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
