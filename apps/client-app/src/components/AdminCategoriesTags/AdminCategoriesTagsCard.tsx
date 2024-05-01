'use client';

import { useEffect, useState } from 'react';

import { SimpleTable } from '@/components/ui/simpleTable';
import { useToast } from '@/components/ui/use-toast';

import { DataTable } from '../ui/dataTable';

import AdminCategoriesTagsHeader from './AdminCategoriesTagsHeader';
import { requestGetCategoriesTags } from './hooks/request';
import { useCategoriesTagsStore } from './storage';

export default function AdminCategoriesTagsCard({ type, className }: { type?: string; className?: string }) {
  const { dataTable, columns } = useCategoriesTagsStore((state) => state.dados);
  const [rowSelection, setRowSelection] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    const getData = async () => {
      await requestGetCategoriesTags();
      toast({ title: 'Categorias das tags encontradas com sucesso!' });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {type === 'simple' ? (
        <SimpleTable
          title="categorias tags"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          rightMenu={<AdminCategoriesTagsHeader setRowSelection={setRowSelection} rowSelection={rowSelection} />}
          className="w-full"
        />
      ) : (
        <DataTable
          title="categorias tags"
          filterId="category"
          filterPlaceholder="Filtrar por categoria"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          className="w-full"
          rightMenu={<AdminCategoriesTagsHeader setRowSelection={setRowSelection} rowSelection={rowSelection} />}
        />
      )}
    </div>
  );
}
