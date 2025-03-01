"use client";

import { useParams } from "next/navigation";
import ProductDetailComponent from "../../components/ProductDetail";

export default function ProductDetailsPage() {
  const { id } = useParams();

  if (!id || typeof id !== "string") {
    return <p className="text-white text-center mt-10">Invalid product</p>;
  }

  return <ProductDetailComponent productId={id} />;
}
