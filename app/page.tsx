import Link from "next/link"; // client side routing without reloading - prefetched

const HomePage = () => {
  return (
    <div>
      <h2 className="text-6xl">Home Page</h2>
      <Link href="/tickets">Go to Tickets</Link>
    </div>
  );
};

export default HomePage;
