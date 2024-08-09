import { PiMagnifyingGlass } from "react-icons/pi";

const Search = () => {
  return (
    <div className="rounded-full flex items-center text-gray-500 ml-4 bg-[#f5f8ff] relative">
      <PiMagnifyingGlass className="ml-2"/>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded-full text-xs focus:outline-none bg-[#f5f8ff]"
      />
    </div>
  );
};

export default Search;
