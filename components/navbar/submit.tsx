import Link from "next/link";

const Submit = () => {
    return (
        <div>
            <Link href={'/new-product'} className="text-[#ff6154]">
                Submit
            </Link>
        </div>
    );
}
 
export default Submit;