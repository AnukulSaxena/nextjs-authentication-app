import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen   items-center justify-center p-24">
      <Link
        href='/profile'
        className={`block my-2 p-2 bg-blue-600 rounded-sm`}
        type="submit">Go to Profile</Link>


    </main>
  );
}
