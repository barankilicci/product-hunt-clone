import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = async () => {
  const authenticatedUser = await auth();
  
  return (
    <>
      <div>

      </div>
    </>
  );
};

export default Home;
