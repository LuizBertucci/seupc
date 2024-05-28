import AdminCategoriesTagsCard from '@/components/AdminCategoriesTags/AdminCategoriesTagsCard';
import AdminTagsCard from '@/components/AdminTags/AdminTagsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PartsPage() {
  return (
    <div className="p-[30px]">
      <Tabs defaultValue="tags" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/2" value="tags">
            Tags
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="categories">
            Categorias
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tags">
          <AdminTagsCard className="w-full" />
        </TabsContent>
        <TabsContent value="categories">
          <AdminCategoriesTagsCard className="w-full" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
