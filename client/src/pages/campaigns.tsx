import { Sidebar } from "@/components/dashboard/sidebar";
import { DataTable } from "@/components/dashboard/data-table";

export default function Campaigns() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground">
              Manage and monitor all your advertising campaigns with full CRUD functionality.
            </p>
          </div>
          
          <DataTable />
        </main>
      </div>
    </div>
  );
}