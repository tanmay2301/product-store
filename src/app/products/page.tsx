"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  description: string;
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      const products: Product[] = data.products;
      setProducts(products);

      const categoryList = [...new Set(products.map((p: Product) => p.category))].slice(0, 3);
      setCategories(categoryList);
      setSelectedCategory(categoryList[0]); 
    }

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[375px] h-[812px] bg-[#121111] rounded-4xl">
        <h1 className="text-[#FCF9F2] text-[35px] pt-[79px] pl-[26px] pr-[159px] leading-[43.2px]">
          Product List
        </h1>
        <Navbar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="grid grid-cols-2 gap-[29px] px-[30px] pt-[33px] place-items-center">
          {products
            .filter((product) => product.category === selectedCategory)
            .slice(0, 4)
            .map((product) => (
              <div key={product.id} className="w-full">
              <Link key={product.id} href={`/products/${product.id}`} className="block w-full h-full">
                <ProductCard product={product} />
              </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
