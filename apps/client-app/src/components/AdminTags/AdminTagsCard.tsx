'use client';

import { useCallback, useEffect, useState } from 'react';

import { SimpleTable } from '@/components/ui/simpleTable';

import { DataTable } from '../ui/dataTable';

import AdminTagsHeader from './AdminTagsHeader';
import { requestGetTags } from './hooks/request';
import { useTagsStore } from './storage';

export default function AdminTagsCard({ type, className }: { type?: string; className?: string }) {
  const { dataTable, columns } = useTagsStore((state) => state.dados);
  const [rowSelection, setRowSelection] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await requestGetTags();
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  return (
    <div className={className}>
      {type === 'simple' ? (
        <SimpleTable
          title="tags"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          rightMenu={
            <AdminTagsHeader setRowSelection={setRowSelection} rowSelection={rowSelection} onRefresh={handleRefresh} />
          }
          className="w-full"
        />
      ) : (
        <DataTable
          title="tags"
          filterId="name"
          filterPlaceholder="Filtrar por nome"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          className="w-full"
          rightMenu={
            <AdminTagsHeader setRowSelection={setRowSelection} rowSelection={rowSelection} onRefresh={handleRefresh} />
          }
        />
      )}
    </div>
  );
}
