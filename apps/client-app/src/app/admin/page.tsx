import AdminBrandsCard from '@/components/AdminBrands/AdminBrandsCard';
import AdminCategoriesTagsCard from '@/components/AdminCategoriesTagsCard';
import AdminPartsCard from '@/components/AdminPartsCard';
import AdminRecCard from '@/components/AdminRecCard';
import AdminStoresCard from '@/components/AdminStoresCard';
import AdminTagsCard from '@/components/AdminTagsCard';

export default function AdminPage() {
  return (
    <div className="flex flex-col px-[30px] mt-[20px] gap-4 ">
      <div className="flex flex-row gap-4 justify-start items-start ">
        <AdminTagsCard type="simple" className="w-1/2" />
        <AdminCategoriesTagsCard type="simple" className="w-1/2" />
      </div>
      <div className="flex flex-row gap-4 justify-start items-start ">
        <AdminBrandsCard />
        <AdminStoresCard />
      </div>
      <div className="flex flex-row gap-4 justify-start items-start ">
        <AdminPartsCard type="simple" className="w-1/2" />
        <AdminRecCard />
      </div>
    </div>
  );
}
