import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/local-storage";
import { format } from "date-fns";
import { Package, Truck, Calendar, DollarSign, User, Mail } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export function OrderModal({ isOpen, onClose, order }: OrderModalProps) {
  if (!order) return null;

  const statusVariants = {
    completed: "default",
    processing: "secondary", 
    shipped: "outline",
    pending: "destructive"
  } as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{order.id}</h3>
              <p className="text-sm text-muted-foreground">
                <Calendar className="inline h-3 w-3 mr-1" />
                {format(order.date, "PPP")}
              </p>
            </div>
            <Badge variant={statusVariants[order.status]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Customer Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{order.customer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{order.email}</span>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Product Details</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <p className="font-medium">{order.product}</p>
              <div className="flex items-center gap-2 mt-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {order.tracking && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Shipping</h4>
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <Truck className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Tracking Number</p>
                  <p className="text-sm font-mono text-blue-600">{order.tracking}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Order Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Order Placed</span>
                <span>{format(order.date, "PPp")}</span>
              </div>
              {order.status === 'processing' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="text-yellow-600">In Progress</span>
                </div>
              )}
              {order.status === 'shipped' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipped</span>
                  <span className="text-blue-600">On the way</span>
                </div>
              )}
              {order.status === 'completed' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivered</span>
                  <span className="text-green-600">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gradient-primary text-white">
            Track Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}