'use client';

import { useEffect, useState } from 'react';

import { SimpleTable } from '@/components/ui/simpleTable';
import { useToast } from '@/components/ui/use-toast';

import AdminStoresHeader from './AdminStoresHeader';
import { requestGetLojas } from './hooks/request';
import { useLojasStore } from './storage';

export default function AdminStoresCard() {
  const { dataTable, columns } = useLojasStore((state) => state.dados);
  const [rowSelection, setRowSelection] = useState({});
  const { toast } = useToast();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getData = async () => {
      await requestGetLojas();
      toast({ title: 'Lojas encontradas com sucesso!' });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-1/2">
      <SimpleTable
        title="Lojas"
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        columns={columns || []}
        data={dataTable || []}
        rightMenu={<AdminStoresHeader setRowSelection={setRowSelection} rowSelection={rowSelection} />}
        className="w-full"
      />
    </div>
  );
}
