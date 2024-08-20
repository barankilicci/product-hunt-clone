import { auth } from "@/auth";
import { getOwnerProducts } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiPlus } from "react-icons/pi";

const MyProductsPage = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const products = await getOwnerProducts();

  return (
    <div className="mx-auto lg:w-3/5 py-10 px-6">
      {products.length === 0 ? (
        <div className="text-3xl font-bold">
          <h1>No Products Found</h1>
          <p className="text-gray-500">
            Looks like you have not created any products yet, click the button
            below to get started.
          </p>
          <Link href={"/new-product"}>
            <div className="bg-[#ff6154] text-white p-4 rounded-md mt-4 w-60 h-56 flex items-center justify-center flex-col">
              <PiPlus className="text-3xl mb-4" />
              <p className="text-lg">Create a product</p>
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Your Products</h1>
          <p>Manage your products here.</p>
          <p className="pt-6">
            ({products.length} / 2) free products
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
            {products.map((product) => (
              <Link href={`/edit/${product.id}`} key={product.id}>
                <div>
                  <div className="rounded-lg hover:scale-105 transition-transform duration-300 transform ease-in justify-center items-center border p-2">
                    <Image
                      src={product.logo}
                      alt="logo"
                      width={1000}
                      height={1000}
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProductsPage;
