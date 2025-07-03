"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertTriangle,
  ArrowUpDown,
  Edit,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  TrendingUp,
  Trash2,
} from "lucide-react"

// Sample data
const initialProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    sku: "WH-001",
    category: "Electronics",
    stock: 45,
    minStock: 10,
    price: 99.99,
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Gaming Mouse",
    sku: "GM-002",
    category: "Electronics",
    stock: 5,
    minStock: 15,
    price: 59.99,
    status: "Low Stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Office Chair",
    sku: "OC-003",
    category: "Furniture",
    stock: 0,
    minStock: 5,
    price: 299.99,
    status: "Out of Stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Desk Lamp",
    sku: "DL-004",
    category: "Furniture",
    stock: 23,
    minStock: 8,
    price: 79.99,
    status: "In Stock",
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    name: "Notebook Set",
    sku: "NS-005",
    category: "Stationery",
    stock: 120,
    minStock: 25,
    price: 19.99,
    status: "In Stock",
    lastUpdated: "2024-01-11",
  },
]

export default function Component() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]
      const modifier = sortOrder === "asc" ? 1 : -1
      return aValue < bValue ? -1 * modifier : aValue > bValue ? 1 * modifier : 0
    })

  // Calculate stats
  const totalProducts = products.length
  const inStock = products.filter((p) => p.status === "In Stock").length
  const lowStock = products.filter((p) => p.status === "Low Stock").length
  const outOfStock = products.filter((p) => p.status === "Out of Stock").length
  const totalValue = products.reduce((sum, p) => sum + p.stock * p.price, 0)

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            In Stock
          </Badge>
        )
      case "Low Stock":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Low Stock
          </Badge>
        )
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAddProduct = (formData: FormData) => {
    const newProduct = {
      id: (products.length + 1).toString(),
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      category: formData.get("category") as string,
      stock: Number.parseInt(formData.get("stock") as string),
      minStock: Number.parseInt(formData.get("minStock") as string),
      price: Number.parseFloat(formData.get("price") as string),
      status:
        Number.parseInt(formData.get("stock") as string) === 0
          ? "Out of Stock"
          : Number.parseInt(formData.get("stock") as string) <= Number.parseInt(formData.get("minStock") as string)
            ? "Low Stock"
            : "In Stock",
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setProducts([...products, newProduct])
    setIsAddDialogOpen(false)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Inventory Management</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form action={handleAddProduct}>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new product to your inventory. Fill in all the required information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sku" className="text-right">
                        SKU
                      </Label>
                      <Input id="sku" name="sku" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select name="category" required>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                          <SelectItem value="Stationery">Stationery</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stock" className="text-right">
                        Stock
                      </Label>
                      <Input id="stock" name="stock" type="number" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="minStock" className="text-right">
                        Min Stock
                      </Label>
                      <Input id="minStock" name="minStock" type="number" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input id="price" name="price" type="number" step="0.01" className="col-span-3" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Product</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inStock}</div>
              <p className="text-xs text-muted-foreground">{((inStock / totalProducts) * 100).toFixed(1)}% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{lowStock}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Inventory worth</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Stationery">Stationery</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          {(categoryFilter !== "all" || statusFilter !== "all") && (
            <Button
              variant="ghost"
              onClick={() => {
                setCategoryFilter("all")
                setStatusFilter("all")
              }}
              className="h-8 px-2 lg:px-3"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your inventory and track stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center space-x-1">
                      <span>Product</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
                    <div className="flex items-center space-x-1">
                      <span>Stock</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                    <div className="flex items-center space-x-1">
                      <span>Price</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{product.stock}</span>
                        {product.stock <= product.minStock && product.stock > 0 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {product.stock === 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{product.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
