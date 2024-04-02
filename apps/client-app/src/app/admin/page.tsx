import MarcaTable from "@/components/AdminTableBrands";
import CategoriesTagsTable from "@/components/AdminTableCategoriesTags";
import PartsTable from "@/components/AdminTableParts";
import RecTable from "@/components/AdminTableRec";
import LojasTable from "@/components/AdminTableStores";
import TagsTable from "@/components/AdminTableTags";


export default function AdminPage() {
  return (
    <div className="flex flex-col px-[30px] mt-[20px] gap-4 " >  
    <div className="flex flex-row gap-4 justify-start items-start " >
   <TagsTable type="simple" className="w-1/2" />
   <CategoriesTagsTable />  
    </div>
    <div className="flex flex-row gap-4 justify-start items-start " >
   <MarcaTable />
   <LojasTable />
    </div>
    <div className="flex flex-row gap-4 justify-start items-start " >
   <PartsTable type="simple" className="w-1/2" />
   <RecTable />
    </div>
    </div>
  )
}
