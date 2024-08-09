"use client";

import { ImagesUploader } from "@/components/images-uploader";
import { LogoUploader } from "@/components/logo-uploader";
import Image from "next/image";
import React, { useCallback, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  PiCalendar,
  PiDiscordLogoFill,
  PiPlanet,
  PiTwitterLogoFill,
} from "react-icons/pi";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { createProduct } from "@/lib/server-actions";

const categories = [
  "Media",
  "Blockchain",
  "Cloud",
  "Commerce",
  "Cybersecurity",
  "Data",
  "Design",
  "Photography",
  "E-commerce",
  "Education",
  "Entertainment",
  "Video",
  "Finance",
  "Social",
  "Health",
  "Fitness",
  "Marketing",
  "Music",
  "Productivity",
  "Engineering",
  "Sales",
  "Sports",
  "Travel",
  "Bootstrapped",
  "Art",
  "Analytics",
];

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [headline, setHeadline] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string>("");

  const handleNameChange = (e: any) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);
    setName(truncatedName);

    // create slug from product name

    const slugValue = truncatedName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/\./g, "-"); // Replace periods with hyphens in the slug
    setSlug(slugValue);
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const handleWebsiteChange = (e: any) => {
    setWebsite(e.target.value);
  };

  const handleTwitterChange = (e: any) => {
    setTwitter(e.target.value);
  };

  const handleDiscordChange = (e: any) => {
    setDiscord(e.target.value);
  };

  const handleLogoUpload = useCallback((url: any) => {
    setUploadedLogoUrl(url);
  }, []);

  const handleHeadlineChange = (e: any) => {
    const headlineText = e.target.value.slice(0.7);
    setHeadline(headlineText);
  };

  const handleShortDescriptionChange = (e: any) => {
    setShortDescription(e.target.value.slice(0, 300));
  };

  const handleProductImagesUpload = useCallback((urls: string[]) => {
    setUploadedProductImages(urls);
  }, []);

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const prevStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleGoToProducts = () => {
    window.location.href = "/my-products";
  };

  const submitAnotherProduct = () => {
    setStep(1);
    setName("");
    setSlug("");
    setHeadline("");
    setShortDescription("");
    setDate(new Date());
    setWebsite("");
    setTwitter("");
    setDiscord("");
    setSelectedCategories([]);
    setUploadedProductImages([]);
    setUploadedLogoUrl("");
  };

  const submitProduct = async () => {
    setLoading(true);
    const formattedDate = date ? format(date, "MM/dd/yyyy") : "";
    try {
      await createProduct({
        name,
        slug,
        headline,
        website,
        twitter,
        discord,
        description: shortDescription,
        category: selectedCategories,
        logo: uploadedLogoUrl,
        images: uploadedProductImages,
        releaseDate: formattedDate,
      });
      setStep(8);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 md:py-20">
      <div className="px-8 md:w-3/5 md:mx-auto">
        {step === 1 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">📦 New Product</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Ready to showcase your product to the world? You came to the right
              place. Follow the steps below to get started.
            </p>
            <div className="mt-10">
              <h2 className="font-medium">Name of the product</h2>
              <input
                value={name}
                type="text"
                maxLength={30}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={handleNameChange}
              />
              <div className="text-sm text-gray-500 mt-1">
                {name.length} / 30
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-medium">
                Slug (URL) - This will be used to create a unique URL for your
                product.
              </h2>
              <input
                type="text"
                value={slug}
                readOnly
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">
              📊 What category does your product belong to ?
            </h1>
            <p className="text-4xl font-light mt-4 leading-8">
              Choose at least 3 categories that best fits your product. This
              will people discover your product.
            </p>
            <div className="mt-10">
              <h2 className="font-medium">Select Categories</h2>
              <div className="grid grid-cols-4 gap-2 pt-4 items-center justify-center">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex border rounded-full"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <div
                      className={`text-xs md:text-sm p-2 cursor-pointer w-full text-center ${
                        selectedCategories.includes(category)
                          ? "bg-[#ff6154] text-white rounded-full"
                          : "text-black"
                      }`}
                    >
                      {category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">📝 Product Details</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Keep it simple and clear. Describe your product in a way that
              makes it easy for people to understand what it does.
            </p>
            <div className="mt-10">
              <h2 className="font-medium">Headline</h2>
              <input
                value={headline}
                onChange={handleHeadlineChange}
                type="text"
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                {headline.length} / 70
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-medium">Short Description</h2>
              <textarea
                value={shortDescription}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                rows={8}
                maxLength={300}
                onChange={handleShortDescriptionChange}
              />
              <div className="text-sm text-gray-500 mt-1">
                {shortDescription.length} / 300
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">
              🌠 Add images to showcase your product
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Include images that best represent your product. This will help
              people understand what your product looks like.
            </p>
            <div className="mt-10">
              <h2 className="font-medium">Logo</h2>
              {uploadedLogoUrl ? (
                <div className="mt-2">
                  <Image
                    src={uploadedLogoUrl}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="rounded-md h-40 w-40 object-cover"
                  />
                </div>
              ) : (
                <LogoUploader
                  endpoint="productLogo"
                  onChange={handleLogoUpload}
                />
              )}
            </div>
            <div className="mt-4">
              <h2 className="font-medium">
                Product Images(upload at least 3 images)
              </h2>
              {uploadedProductImages.length > 0 ? (
                <div className="mt-2 md:flex gap-2 space-y-4 md:space-y-0">
                  {uploadedProductImages.map((url, index) => (
                    <div key={index} className="relative md:w-40 h-40">
                      <Image
                        priority
                        src={url}
                        alt="Uploaded Product Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ImagesUploader
                  endpoint="productImages"
                  onChange={handleProductImagesUpload}
                />
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">🗓️ Release Date</h1>
            <p className="text-xl font-light mt-4 leading-8">
              When will your product be available to the public? Select a date
              to continue.
            </p>
            <div className="mt-10">
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <PiCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => setDate(date)}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">Additional Links</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Add links to your product&apos;s website, social media,and other
              platforms.
            </p>
            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <PiPlanet className="text-2xl text-gray-600" />
                <span>Website</span>
              </div>
              <input
                type="text"
                value={website}
                onChange={handleWebsiteChange}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                placeholder="https://yourdomain.com"
              />
            </div>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <PiTwitterLogoFill className="text-2xl text-gray-600" />
                <span>X</span>
              </div>
              <input
                type="text"
                value={twitter}
                onChange={handleTwitterChange}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                placeholder="https://x.com"
              />
            </div>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <PiDiscordLogoFill className="text-2xl text-gray-600" />
                <span>Discord</span>
              </div>
              <input
                type="text"
                value={discord}
                onChange={handleDiscordChange}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                placeholder="https://discord.com"
              />
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold"> 🔍 Review and submit</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Review the details of your product and submit it to the world.
              Your product will be reviewed by our team before it goes live.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="">
                <div className="font-semibold">Name of the product</div>
                <div className=" mt-2 text-gray-600">{name}</div>
              </div>

              <div className="">
                <div className="font-semibold">Slug ( URL ) </div>
                <div className=" mt-2 text-gray-600">{slug}</div>
              </div>

              <div className="">
                <div className="font-semibold">Category</div>
                <div className="  mt-2 text-gray-600">
                  {selectedCategories.join(", ")}
                </div>
              </div>

              <div>
                <div className="font-semibold">Website URL</div>
                <div className=" mt-2 text-gray-600">{website}</div>
              </div>

              <div className="">
                <div className="font-semibold">Headline</div>
                <div className="  mt-2 text-gray-600">{headline}</div>
              </div>
              <div className="">
                <div className="font-semibold">Short description</div>
                <div className=" mt-2 text-gray-600 ">{shortDescription}</div>
              </div>

              <div>
                <div className="font-semibold">Twitter</div>
                <div className=" mt-2 text-gray-600">{twitter}</div>
              </div>

              <div>
                <div className="font-semibold">Discord</div>
                <div className=" mt-2 text-gray-600">{discord}</div>
              </div>

              <div className="">
                <div className="font-semibold">
                  Release date - Pending Approval
                </div>
                <div className=" mt-2 text-gray-600">
                  {date ? date.toDateString() : "Not specified"}
                </div>
              </div>

              <div className="cols-span-2">
                <div className="font-semibold">Product Images</div>
                <div className="mt-2 md:flex gap-2 w-full">
                  {uploadedProductImages.map((url, index) => (
                    <div key={index} className="relative w-28 h-28">
                      <Image
                        priority
                        src={url}
                        alt="Uploaded Product Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">Congratulations 🎉</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Your product has been successfully submitted. Our team will review
              it and get back to your soon.
            </p>
            <div className="flex flex-col  gap-4">
              <div
                onClick={handleGoToProducts}
                className="bg-[#ff6154] text-white py-2 px-4
                 rounded mt-4 flex w-60 justify-center items-center cursor-pointer"
              >
                Go to your products
              </div>

              <Separator />

              <div
                onClick={submitAnotherProduct}
                className="text-[#ff6154] py-2 px-4 rounded mt-4 
                flex w-60 justify-center items-center cursor-pointer"
              >
                Submit another product
              </div>
            </div>
          </div>
        )}

        {step !== 8 && (
          <>
            <div className="flex justify-between items-center mt-10 ">
              {step !== 1 && (
                <button onClick={prevStep} className="text-gray-600">
                  Previous
                </button>
              )}

              <div className="flex items-center">
                {step === 7 ? (
                  <button
                    onClick={submitProduct}
                    className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    {step === 7 ? "Submit" : "Continue"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
