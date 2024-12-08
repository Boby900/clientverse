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
import { Github } from "lucide-react";

export const SignIn = () => {
  const apiUrl =
    import.meta.env.VITE_API_URL || 'http://localhost:3000'; 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = await fetch(apiUrl + '/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    
    console.log(data)
    console.log("form submitted");
  };

  return (
    <div className="flex justify-center p-8 m-8 items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Sign In with Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Github className="mr-2 h-4 w-4" />
            Sign In with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
