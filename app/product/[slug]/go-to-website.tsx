"use client";

interface GoToWebsiteProps {
  website: string;
}

const GoToWebsite: React.FC<GoToWebsiteProps> = ({ website }) => {
  return (
    <div
      className="hidden lg:flex hover:underline cursor-pointer"
      onClick={() => window.open(website, "_blank")}
    >
      Go to website
    </div>
  );
};

export default GoToWebsite;
