
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") || "login";
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [isVendor, setIsVendor] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      // In a real implementation, this would make an API call to authenticate
      console.log("Login with:", { loginEmail, loginPassword });
      
      // Simulate successful login
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsRegisterLoading(true);

    try {
      // In a real implementation, this would make an API call to register
      console.log("Register with:", { 
        registerName, 
        registerEmail, 
        registerPassword,
        isVendor
      });
      
      // Simulate successful registration
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
      
      if (isVendor) {
        navigate("/vendor/onboarding");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Tabs 
        defaultValue={defaultTab} 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <div className="space-y-4 p-6 border rounded-lg shadow-sm">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-marketplace-purple hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-marketplace-purple hover:bg-marketplace-purple-dark"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Loading..." : "Login"}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-500">Don't have an account?{" "}</span>
              <button 
                onClick={() => setActiveTab("register")}
                className="text-marketplace-purple hover:underline font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="register">
          <div className="space-y-4 p-6 border rounded-lg shadow-sm">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-gray-500 text-sm">Register to start shopping or selling</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="Create a password" 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="Confirm your password" 
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is-vendor"
                  checked={isVendor}
                  onChange={(e) => setIsVendor(e.target.checked)}
                  className="rounded border-gray-300 text-marketplace-purple focus:ring-marketplace-purple"
                />
                <Label htmlFor="is-vendor" className="text-sm font-normal">I want to register as a vendor</Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-marketplace-purple hover:bg-marketplace-purple-dark"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? "Creating Account..." : "Register"}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-500">Already have an account?{" "}</span>
              <button 
                onClick={() => setActiveTab("login")}
                className="text-marketplace-purple hover:underline font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
