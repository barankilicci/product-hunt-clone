"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

interface ProductData {
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  releaseDate: string;
  website: string;
  twitter: string;
  discord: string;
  images: string[];
  category: string[];
  rank?: number;
}

export const createProduct = async ({
  name,
  slug,
  headline,
  description,
  logo,
  releaseDate,
  website,
  twitter,
  discord,
  images,
  category,
}: ProductData): Promise<any> => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to create a product");
    }

    const userId = authenticatedUser.user?.id;

    const product = await db.product.create({
      data: {
        name,
        rank: 0,
        slug,
        headline,
        description,
        logo,
        releaseDate,
        website,
        twitter,
        discord,
        status: "PENDING",
        categories: {
          connectOrCreate: category.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
        images: {
          createMany: {
            data: images.map((image) => ({ url: image })),
          },
        },

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateProduct = async (
  productId: string,
  {
    name,
    slug,
    headline,
    description,
    logo,
    releaseDate,
    website,
    twitter,
    discord,
    images,
  }: ProductData
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a product");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      images: {
        deleteMany: {
          productId,
        },
        createMany: {
          data: images.map((image) => ({ url: image })),
        },
      },
      status: "PENDING",
    },
  });
  return product;
};

export const getOwnerProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    return [];
  }

  const userId = authenticatedUser.user?.id;

  const products = await db.product.findMany({
    where: {
      userId,
    },
  });

  return products;
};

export const getProductById = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        categories: true,
        images: true,
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProduct = async (productId: string) => {
  const authenticatedUser = await auth();

  if (
    !authenticatedUser ||
    !authenticatedUser.user ||
    !authenticatedUser.user.id
  ) {
    throw new Error("User ID is missing or invalid");
  }

  const userId = authenticatedUser.user.id;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || product.userId !== userId) {
    throw new Error("Product not found or not authorized");
  }

  await db.product.delete({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  return true;
};

export const getPendingProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      categories: true,
      images: true,
    },
  });

  return products;
};

export const activateProduct = async(productId:string) =>{
  try {
    const product = await db.product.findUnique({
      where:{
        id:productId,
      }
    });

    if(!product){
      throw new Error("Product not found");
    }

    await db.product.update({
      where:{
        id:productId,
      },
      data:{
        status: "ACTIVE",
      },
    });

    await db.notification.create({
      data:{
        userId: product.userId,
        body: `Your product ${product.name} has been activated.`,
        type: "ACTIVATED",
        status: "UNREAD",
        profilePicture: product.logo,
        productId:product.id,
      }
    })

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const rejectProduct = async(productId: string, reason:string) =>{
  try {
    const product = await db.product.findUnique({
      where:{
        id:productId,
      },
    });

    if(!product){
      throw new Error("Product not found or not authorized.")
    }

    await db.product.update({
      where:{
        id:productId,
      },
      data:{
        status: "REJECTED",
      }
    });

    await db.notification.create({
      data:{
        userId: product.userId,
        body: `Your product "${product.name}" has been rejected. Reason: ${reason}`,
        type: "REJECTED",
        status: "UNREAD",
        profilePicture: `${product.logo}`,
        productId: productId,
      }
    })
  } catch (error) {
    console.error("Error rejecting product:" ,error)
    throw error;
  }
}