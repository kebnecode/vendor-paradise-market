
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "login";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <AuthForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
