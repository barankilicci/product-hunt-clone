import Image from "next/image";
import Link from "next/link";
import { PiBell, PiGear } from "react-icons/pi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PendingProducts from "./pending-products";
import { getPendingProducts } from "@/lib/server-actions";
import { auth } from "@/auth";

const Admin = async () => {
  const pendingProducts = await getPendingProducts();
  const authenticatedUser = await auth();
  return (
    <div className="px-8 md:px-20">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-6 items-center py-10">
            <Link href={"/"}>
              <Image
                src={"/logo/logo.png"}
                alt="logo"
                width={500}
                height={500}
                className="w-20 h-20 md:w-40 md:h-40 border rounded-md cursor-pointer"
              />
            </Link>
            <div className="hidden md:block">
              <h1 className="text-3xl font-bold ">Welcome back admin</h1>
              <p className="text-gray-500">
                Here is what&apos;s happening in your business today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <PiBell className="text-2xl text-gray-500" />
            <PiGear className="text-2xl text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justift-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">Users</CardTitle>🤙🏻
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justift-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">Premium Users</CardTitle>
              🤑
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justift-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">
                Active Products
              </CardTitle>
              📦
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justift-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">
                Pending Products
              </CardTitle>
              🕖
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justift-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">
                Rejected Products
              </CardTitle>{" "}
              ❌
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justift-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">Upvotes</CardTitle> 📌
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>
        </div>

        <Separator className="my-10" />

        <div className="pb-10 space-y-10">
          <h1 className="text-2xl font-bold">Pending Products</h1>
          <PendingProducts
            pendingProducts={pendingProducts}
            authenticatedUser={authenticatedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
