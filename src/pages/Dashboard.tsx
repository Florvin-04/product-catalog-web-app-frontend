import AddProduct from "@/components/customize/AddProductModal";
import CategoryBadges from "@/components/customize/CategoryBadges";
import CategoryFilter from "@/components/customize/CategoryFilter";
import { columns } from "@/components/customize/table/columns";
import { DataTable } from "@/components/customize/table/data-table";
import { Input } from "@/components/ui/input";
import type { Category } from "@/lib/types";
import { useGetProductsQuery } from "@/services/productService";
import { useState } from "react";

function Dashboard() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const [searchName, setSearchName] = useState("");

  const { data: products, isLoading } = useGetProductsQuery({
    categoryIds:
      selectedCategories.length > 0
        ? selectedCategories.map((cat) => cat.id)
        : undefined,
    name: searchName,
  });

  const handleCategoryChange = (category: Category) => {
    const isSelected = selectedCategories.some(
      (selectedCat) => selectedCat.id === category.id
    );

    if (isSelected) {
      const filteredCategories = selectedCategories.filter(
        (cat) => cat.id !== category.id
      );

      setSelectedCategories(filteredCategories);
    } else {
      const newCategories = [...selectedCategories, category];
      setSelectedCategories(newCategories);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-2">
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={(categories) => {
            setSelectedCategories(categories);
          }}
        />

        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <AddProduct />
      </div>

      <CategoryBadges
        categories={selectedCategories}
        onRemove={(category) => {
          handleCategoryChange(category);
        }}
      />

      <DataTable
        columns={columns}
        data={products ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Dashboard;
