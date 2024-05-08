'use client';

import { useEffect, useState } from 'react';

import { DataTable } from '../ui/dataTable';
import { SimpleTable } from '../ui/simpleTable';

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
          rightMenu={<div>Oi</div>}
        />
      ) : (
        <DataTable
          title="notebooks"
          columnsFilter={[
            {
              column: 'partType',
              options: [
                { label: 'HD', value: 'HD' },
                { label: 'SSD', value: 'SSD' },
                { label: 'Memória RAM', value: 'Ram Memory' },
                { label: 'Processador', value: 'Processor' },
                { label: 'Placa Gráfica', value: 'Video Card' },
              ],
              title: 'Partes',
            },
          ]}
          filterId="name"
          filterPlaceholder="Filtrar por nome"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          className="w-full"
          rightMenu={<div>oi</div>}
        />
      )}
    </div>
  );
}
