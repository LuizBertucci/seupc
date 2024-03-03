"use client"

import Image from "next/image";
import logo from "../../public/logo.png"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { faLaptop, faGear, faMicrochip, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "./ui/tooltip";

export default function MainNav() {
  const route = useRouter()

  return (
    <div className="flex flex-col h-screen w-[60px] bg-white justify-start items-center gap-2 " >
      <Image src={logo} alt={"SeuPC logo"} className="w-[60px] h-[60px] cursor-pointer" onClick={() => route.push("/admin")} />
      <div className="flex flex-col w-full gap-6 justify-center items-center" >

        <Tooltip content={"Configurações Gerais"}>
      <FontAwesomeIcon icon={faGear} onClick={() => route.push("/admin")} className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]" />
      </Tooltip>

      <Tooltip content={"Notebooks"} >
      <FontAwesomeIcon icon={faLaptop} onClick={() => route.push("/admin/notbooks")} className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]" />
      </Tooltip>

      <Tooltip content={"Parts"} >
      <FontAwesomeIcon icon={faMicrochip} onClick={() => route.push("/admin/parts")} className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]" />
      </Tooltip>

      <Tooltip content={"Tags"} >
      <FontAwesomeIcon icon={faHashtag} onClick={() => route.push("/admin/tags")} className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]" />
      </Tooltip>
  
      </div>
    </div>
  )
}
