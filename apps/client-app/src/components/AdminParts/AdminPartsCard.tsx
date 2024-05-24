'use client';

import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/dataTable';
import { SimpleTable } from '@/components/ui/simpleTable';

import AdminPartsHeader from './AdminPartsHeader';
import { requestGetParts } from './hooks/request';
import { usePartStore } from './storage';

function AdminPartsCard({ type, className }: { type?: string; className?: string }) {
  const { dataTable, columns } = usePartStore((state) => state.dados);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const getData = async () => {
      await requestGetParts();
    };

    getData();
  }, []);

  return (
    <div className={className}>
      {type === 'simple' ? (
        <SimpleTable
          title="partes"
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns || []}
          data={dataTable || []}
          className="w-full"
          rightMenu={<AdminPartsHeader setRowSelection={setRowSelection} rowSelection={rowSelection} />}
        />
      ) : (
        <DataTable
          title="partes"
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
          rightMenu={<AdminPartsHeader setRowSelection={setRowSelection} rowSelection={rowSelection} />}
        />
      )}
    </div>
  );
}

export default AdminPartsCard;
