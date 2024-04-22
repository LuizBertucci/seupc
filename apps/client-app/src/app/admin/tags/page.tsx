"use client"

import AdminCategoriesTagsTable from "@/components/AdminCategoriesTagsCard";
import TagsTable from "@/components/AdminTableTags";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PartsPage() {
  return (
    <div className="p-[30px]" >
      <Tabs defaultValue="tags" className="w-full">
        <TabsList className="w-full" >
          <TabsTrigger className="w-1/2" value="tags">Tags</TabsTrigger>
          <TabsTrigger className="w-1/2" value="categories">Categorias</TabsTrigger>
        </TabsList>
        <TabsContent value="tags"><TagsTable className="w-full" /></TabsContent>
        <TabsContent value="categories"><AdminCategoriesTagsTable className="w-full" /></TabsContent>
      </Tabs>
    </div>
  )
}
