import Link from "next/link"; // client side routing without reloading - prefetched
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-6xl">Home Page</h2>
      <Link href={ticketsPath()}>Go to Tickets</Link>
    </div>
  );
};

export default HomePage;
