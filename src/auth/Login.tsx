import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from 'lucide-react';
import { useNavigate } from "react-router";
import { Link } from "react-router";
export const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result)
      if(response.ok){
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login in your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input 
                name="email" 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input 
                name="password" 
                id="password" 
                type="password"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Log In with Email
            </Button>
          </form>
        </CardContent>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <CardFooter className="flex flex-col space-y-4 mt-6">
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Log In with GitHub
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup">
            <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:underline">
              Sign Up
            </Button>
            </Link>
      
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

