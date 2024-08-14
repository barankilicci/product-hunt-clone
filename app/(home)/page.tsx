import ActiveProducts from "@/components/active-products";

import { getActiveProducts } from "@/lib/server-actions";

const Home = async () => {
  const activeProducts = await getActiveProducts();

  return (
    <div className="md:w-3/5 mx-auto py-10 px-6">
      <ActiveProducts activeProducts={activeProducts} />
    </div>
  );
};

export default Home;
