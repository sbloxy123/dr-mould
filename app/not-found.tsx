import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center w-fit flex flex-col justify-center align-middle m-auto h-[60vh]">
      <h1 className="text-6xl py-6">Ooops...</h1>
      <p className="text-6xl pb-10">☹️</p>
      <h2 className="text-xl pb-6">That page cannot be found</h2>
      <p>
        Go back to the{" "}
        <Link className="text-blue-600 underline" href="/">
          Homepage
        </Link>
      </p>
    </div>
  );
}
