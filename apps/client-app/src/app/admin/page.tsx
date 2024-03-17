import PartsTable from "@/components/pages/admin/PartsTable";
import TagsTable from "@/components/pages/admin/TagsTable";


export default function Admin() {

  return (
    <div className="flex flex-row flex-grow gap-4 justify-center items-start px-[30px] mt-[20px] " >
   <PartsTable />
   <TagsTable />
    </div>
  )
}
