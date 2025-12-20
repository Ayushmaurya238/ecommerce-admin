import Image from "next/image";

let fn = async () => {
  let res = await fetch('/api');
  console.log(res);
}
export default function Home() {



  return (
    <>
      <div className="navbar bg-green-300 h-15">

      </div>

    </>
  );
}
