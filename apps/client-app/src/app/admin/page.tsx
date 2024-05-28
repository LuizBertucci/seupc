'use client';
import AdminNotebooksCard from '@/components/AdminNotebooks/AdminNotebooksCard';
import AdminPartsCard from '@/components/AdminParts/AdminPartsCard';
import AdminRecCard from '@/components/AdminRec/AdminRecCard';
import AdminStoresCard from '@/components/AdminStores/AdminStoresCard';
import AdminTagsCard from '@/components/AdminTags/AdminTagsCard';
import { RefreshProvider } from '@/context/RefreshContext';

export default function AdminPage() {
  return (
    <RefreshProvider>
      <div className="flex flex-col px-[30px] mt-[20px] gap-4 my-5">
        <div className="flex flex-row gap-4 justify-start items-start ">
          <AdminPartsCard className="w-full " />
          <AdminTagsCard className="w-full" />
        </div>
        <div className="flex flex-row gap-4 justify-start items-start ">
          <AdminStoresCard />
          <AdminRecCard />
        </div>
        <div className="flex flex-row gap-4 justify-start items-start ">
          <AdminNotebooksCard />
        </div>
      </div>
    </RefreshProvider>
  );
}
