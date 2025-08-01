import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Package, User, MapPin, CreditCard, Truck } from "lucide-react";
import { Order } from "@/lib/local-storage";
import { format } from "date-fns";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export function OrderModal({ isOpen, onClose, order }: OrderModalProps) {
  if (!order) return null;

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case "completed":
        return "default";
      case "processing":
        return "secondary";
      case "shipped":
        return "outline";
      case "pending":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "processing":
        return "text-blue-600";
      case "shipped":
        return "text-purple-600";
      case "pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95vw] mx-auto max-h-[95vh] overflow-y-auto sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-medium">{order.id}</p>
            </div>
            <Badge variant={getStatusVariant(order.status)} className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center">
              <User className="mr-2 h-4 w-4" />
              Customer Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{order.email}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Product Details
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Product</p>
                <p className="font-medium">{order.product}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium text-lg">${order.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Order Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Order Date</p>
                <p className="font-medium">{format(order.date, "MMMM dd, yyyy 'at' hh:mm a")}</p>
              </div>
              {order.tracking && (
                <div>
                  <p className="text-muted-foreground">Tracking Number</p>
                  <div className="flex items-center gap-2">
                    <Truck className="h-3 w-3 text-blue-500" />
                    <p className="font-mono font-medium text-blue-600">{order.tracking}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}