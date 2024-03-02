import Image from "next/image";
import logo from "../../public/logo.png"
import Link from "next/link";

export default function MainNav() {

  return (
    <div className="flex flex-row w-full h-[50px] bg-white justify-start space-x-10 items-center p-4 " >
        
        <Image src={logo} alt={"SeuPC logo"} className="w-[100px] h-[100px]" />
      

        <div className="flex flex-row w-5/6 justify-start items-start space-x-12 " >
<Link className="font-bold cursor-pointer hover:text-primary transition delay-75 hover:translate-y-[-1px] " href={"/admin"}>GERAL</Link>
        <Link className=" font-bold cursor-pointer hover:text-primary transition delay-75 hover:translate-y-[-1px] " href={"/admin/notbooks"}>NOTBOOKS</Link>
        <Link className=" font-bold cursor-pointer hover:text-primary transition delay-75 hover:translate-y-[-1px] " href={"/admin/parts"}>PARTS</Link>
        <Link className=" font-bold cursor-pointer hover:text-primary transition delay-75 hover:translate-y-[-1px] " href={"/admin/tags"}>TAGS</Link>
        </div>
    </div>
  )
}
