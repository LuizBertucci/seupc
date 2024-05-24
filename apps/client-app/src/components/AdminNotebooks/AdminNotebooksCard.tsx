'use client';

import { useEffect, useState } from 'react';

import { DataTable } from '../ui/dataTable';
import { SimpleTable } from '../ui/simpleTable';

import AdminNotebooksHeader from './AdminNotebooksHeader';
import { requestGetNotebooks } from './hooks/request';
import { useNotebooksStore } from './storage';

export default function AdminNotebooksCard({ type }: { type?: string }) {
  const { dataTable, columns } = useNotebooksStore((state) => state.dados);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const getData = async () => {
      await requestGetNotebooks();
    };
    getData();
  }, []);

  return (
    <div className="w-full">
      {type === 'simple' ? (
        <SimpleTable
          title="notebooks"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          className="w-full"
          rightMenu={<AdminNotebooksHeader rowSelection={rowSelection} />}
        />
      ) : (
        <DataTable
          title="notebooks"
          filterId="name"
          filterPlaceholder="Filtrar por nome"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          className="w-full"
          rightMenu={<AdminNotebooksHeader rowSelection={rowSelection} />}
        />
      )}
    </div>
  );
}
