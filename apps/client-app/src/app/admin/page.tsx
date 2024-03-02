import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

export default function Admin() {
       
    const payments: Payment[] = [
        {
          id: "728ed52f",
          amount: 100,
          status: "pending",
          email: "m@example.com",
        },
        {
          id: "489e1d42",
          amount: 125,
          status: "processing",
          email: "example@gmail.com",
        },
      ]

  const columns: ColumnDef<Payment>[] = [
        {
          accessorKey: "status",
          header: "Status",
        },
        {
          accessorKey: "email",
          header: "Email",
        },
        {
          accessorKey: "amount",
          header: "Amount",
        },
      ]


  return (
    <div className="flex flex-col justify-center items-center px-[30px] mt-[20px] " >
        <h1>Admin</h1>

<DataTable columns={columns || []} data={payments || []} className="w-full" />


    </div>
  )
}
