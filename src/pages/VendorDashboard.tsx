
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  BarChart2, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown,
  Package 
} from "lucide-react";

const VendorDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Welcome back, John</span>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,550.32</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 10.5%
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 12.3%
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 4.5%
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" /> 2.1%
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Overview of your latest orders
              </CardDescription>
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
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "ORD-001",
                        customer: "John Doe",
                        date: "2023-05-15",
                        status: "Delivered",
                        amount: 125.99,
                      },
                      {
                        id: "ORD-002",
                        customer: "Jane Smith",
                        date: "2023-05-14",
                        status: "Processing",
                        amount: 85.50,
                      },
                      {
                        id: "ORD-003",
                        customer: "Bob Johnson",
                        date: "2023-05-13",
                        status: "Shipped",
                        amount: 210.25,
                      },
                      {
                        id: "ORD-004",
                        customer: "Alice Brown",
                        date: "2023-05-12",
                        status: "Delivered",
                        amount: 45.00,
                      },
                      {
                        id: "ORD-005",
                        customer: "Michael Wilson",
                        date: "2023-05-11",
                        status: "Processing",
                        amount: 65.75,
                      },
                    ].map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="px-4 py-4 text-sm">{order.id}</td>
                        <td className="px-4 py-4 text-sm">{order.customer}</td>
                        <td className="px-4 py-4 text-sm">{order.date}</td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="text-marketplace-purple">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Your best performing products this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">Sold</th>
                      <th className="px-4 py-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "PROD-001",
                        name: "Wireless Bluetooth Earbuds",
                        price: 59.99,
                        sold: 48,
                        revenue: 2879.52,
                      },
                      {
                        id: "PROD-002",
                        name: "Smart Watch Series 5",
                        price: 179.99,
                        sold: 15,
                        revenue: 2699.85,
                      },
                      {
                        id: "PROD-003",
                        name: "Ultra HD Smart TV 55\"",
                        price: 599.99,
                        sold: 3,
                        revenue: 1799.97,
                      },
                      {
                        id: "PROD-004",
                        name: "Designer Leather Handbag",
                        price: 129.99,
                        sold: 27,
                        revenue: 3509.73,
                      },
                      {
                        id: "PROD-005",
                        name: "Men's Casual Dress Shirt",
                        price: 49.99,
                        sold: 35,
                        revenue: 1749.65,
                      },
                    ].map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="px-4 py-4 text-sm">{product.name}</td>
                        <td className="px-4 py-4 text-sm text-right">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">{product.sold}</td>
                        <td className="px-4 py-4 text-sm text-right">
                          ${product.revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="text-marketplace-purple">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
