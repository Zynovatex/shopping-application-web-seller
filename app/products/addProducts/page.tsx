// app/(dashboard)/products/create/page.tsx
import React from "react";
import ProductForm from "../../component/ProductForm";

const CreateProductPage = () => {
  return (
    <div className="p-6">
      <ProductForm />
    </div>
  );
};

export default CreateProductPage;
