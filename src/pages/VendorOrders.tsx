
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VendorOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      date: "2023-05-15",
      status: "Delivered",
      amount: 125.99,
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2023-05-14",
      status: "Processing",
      amount: 85.50,
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      date: "2023-05-13",
      status: "Shipped",
      amount: 210.25,
      items: 3,
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      date: "2023-05-12",
      status: "Delivered",
      amount: 45.00,
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      email: "michael@example.com",
      date: "2023-05-11",
      status: "Processing",
      amount: 65.75,
      items: 2,
    },
    {
      id: "ORD-006",
      customer: "Sarah Davis",
      email: "sarah@example.com",
      date: "2023-05-10",
      status: "Cancelled",
      amount: 95.25,
      items: 2,
    },
    {
      id: "ORD-007",
      customer: "James Miller",
      email: "james@example.com",
      date: "2023-05-09",
      status: "Delivered",
      amount: 150.00,
      items: 4,
    },
    {
      id: "ORD-008",
      customer: "Emma Wilson",
      email: "emma@example.com",
      date: "2023-05-08",
      status: "Shipped",
      amount: 55.99,
      items: 1,
    },
  ];
  
  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Orders</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle>Order History</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-8 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-center">Items</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="px-4 py-4 text-sm font-medium">
                          {order.id}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div>{order.customer}</div>
                          <div className="text-xs text-gray-500">{order.email}</div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {order.date}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          {order.items}
                        </td>
                        <td className="px-4 py-4 text-sm text-right font-medium">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;
