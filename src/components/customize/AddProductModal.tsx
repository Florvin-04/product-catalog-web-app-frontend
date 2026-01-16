import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddEditProductForm from "./form/AddEditProductForm";

const AddProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <AddEditProductForm onClose={() => setIsOpen(false)} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 16px",
          backgroundColor: "black", // blue
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductModal;
