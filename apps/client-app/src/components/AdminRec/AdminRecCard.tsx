'use client';

import { useEffect, useState } from 'react';

import { SimpleTable } from '@/components/ui/simpleTable';
import { useToast } from '@/components/ui/use-toast';

import AdminRecHeader from './AdminRecHeader';
import { requestGetRec } from './hooks/request';
import { useRecStore } from './storage';

export default function AdminRecCard() {
  const { dataTable, columns } = useRecStore((state) => state.dados);
  const [rowSelection, setRowSelection] = useState({});
  const { toast } = useToast();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <exðplanation>
  useEffect(() => {
    const getData = async () => {
      await requestGetRec();
      toast({ title: 'Sites de recomendação encontrados com sucesso!' });
    };

    getData();
  }, []);

  return (
    <div className="w-1/2">
      <SimpleTable
        title="Sites de Recomendação"
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        columns={columns || []}
        data={dataTable || []}
        rightMenu={<AdminRecHeader setRowSelection={setRowSelection} rowSelection={rowSelection} />}
        className="w-full"
      />
    </div>
  );
}
