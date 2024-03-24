import CategoriesTagsTable from "@/components/pages/admin/CategoriesTagsTable";
import PartsTable from "@/components/pages/admin/PartsTable";
import TagsTable from "@/components/pages/admin/TagsTable";


export default function Admin() {

  return (
    <div className="flex flex-col px-[30px] mt-[20px] gap-4 " >  
    <div className="flex flex-row gap-4 justify-start items-start " >
   <PartsTable />
   <TagsTable />
    </div>
    <div className="flex flex-row gap-4 justify-start items-start " >
   <CategoriesTagsTable />  
    </div>
    </div>
  )
}
