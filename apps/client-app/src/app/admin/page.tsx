import CategoriesTagsTable from "@/components/pages/admin/CategoriesTagsTable";
import LojasTable from "@/components/pages/admin/LojasTable";
import MarcaTable from "@/components/pages/admin/MarcasTable";
import PartsTable from "@/components/pages/admin/PartsTable";
import TagsTable from "@/components/pages/admin/TagsTable";


export default function Admin() {

  return (
    <div className="flex flex-col px-[30px] mt-[20px] gap-4 " >  
    <div className="flex flex-row gap-4 justify-start items-start " >
   <TagsTable />
   <CategoriesTagsTable />  
    </div>
    <div className="flex flex-row gap-4 justify-start items-start " >
   <MarcaTable />
   <LojasTable />
    </div>
    <div className="flex flex-row gap-4 justify-start items-start " >
   <PartsTable />
    </div>
    </div>
  )
}
