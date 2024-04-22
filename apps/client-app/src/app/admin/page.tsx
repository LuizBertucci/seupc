

import AdminBrandsCard from '@/components/AdminBrandsCard';
import AdminCategoriesTagsCard from '@/components/AdminCategoriesTagsCard';
import AdminPartsCard from "@/components/AdminPartsCard";
import RecTable from "@/components/AdminTableRec";
import LojasTable from "@/components/AdminTableStores";
import TagsTable from "@/components/AdminTableTags";


export default function AdminPage() {
  return (
    <div className="flex flex-col px-[30px] mt-[20px] gap-4 " >
      <div className="flex flex-row gap-4 justify-start items-start " >
        <TagsTable type="simple" className="w-1/2" />
        <AdminCategoriesTagsCard type="simple" className="w-1/2" />
      </div>
      <div className="flex flex-row gap-4 justify-start items-start " >
        <AdminBrandsCard />
        <LojasTable />
      </div>
      <div className="flex flex-row gap-4 justify-start items-start " >
        <AdminPartsCard type="simple" className="w-1/2" />
        <RecTable />
      </div>
    </div>
  )
}
