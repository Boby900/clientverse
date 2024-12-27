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
import { Github, Mail } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export const SignUp = () => {
  const [error, setError] = useState("")
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const githubLoginUrl = `${apiUrl}/api/auth/github/login`;
  const googleLoginUrl = `${apiUrl}/api/auth/google/login`; // Add this line for Google login URL

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
        credentials: 'include', // Ensures cookies are sent with the request
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
      else{
        setError(result.message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
          {error && (<p className="text-sm text-red-500 text-center mt-2">{error}</p>)}
        </CardHeader>
        <CardContent className="space-y-4">
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
              <Mail className="mr-2 h-4 w-4" />
              Sign Up with Email
            </Button>
          </form>
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
          <div className="grid grid-cols-2 gap-4">
            <a href={githubLoginUrl} className="w-full">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href={googleLoginUrl} className="w-full">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google
              </Button>
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-6">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login">
              <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:underline">
                Log in
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;

