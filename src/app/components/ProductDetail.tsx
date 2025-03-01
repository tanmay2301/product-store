"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Minus, Star } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  description: string;
}

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetailComponent({ productId }: ProductDetailProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[375px] h-[812px] bg-[#121111] rounded-4xl">
        
        {/* Product Image with Back Button Overlay */}
        <div className="relative">
          <button 
            onClick={() => router.back()} 
            className="absolute cursor-pointer top-[10px] left-[30px] w-[24px] h-auto z-10 text-[#FCF9F2]"
          >
            <ChevronLeft className="w-[24px] h-[24px]" />
          </button>
          <Image
            width={100}
            height={100}
            src={product.thumbnail}
            alt={product.title}
            loader={({ src }) => src} 
            className="w-full h-full object-cover mt-[30px]"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col mt-[10px]">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-[24px] text-[#FCF9F2]">{product.title}</h1>
            <div className="flex items-center">
              <Star className="w-[18px] h-[18px] fill-yellow-400 text-yellow-400" />
              <span className="text-lg text-white ml-1">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm text-[#b2b2b1] mt-2">{product.description}</p>
          
          {/* Price & Quantity Controls */}
          <div className="mt-auto flex justify-between items-center pt-6 pb-4">
            <div className="flex items-center">
              <button
                className="cursor-pointer w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full text-white"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus className="w-4 h-4 text-amber-400" />
              </button>
              <span className="text-white mx-3">{quantity}</span>
              <button
                className=" cursor-pointer w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full text-white"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus className="w-4 h-4 text-amber-400" />
              </button>
            </div>
            <div className="text-xl font-medium text-white">${product.price.toFixed(1)}</div>
          </div>
          
          <div className="absolute bottom-[120px] w-84 px-3">
  <button
    className="w-full h-[56px] py-3 cursor-pointer font-normal shadow-[0_0_5px_#F9D03F] hover:shadow-[0_0_9px_#F9D03F] transition duration-300 bg-gradient-to-r from-[#F9D03F] to-[#E9B32A] text-black text-[18px] rounded-lg text-center"
    onClick={() => alert("Added to cart")}
  >
    Add to cart
  </button>
</div>
        </div>
      </div>
    </div>
  );
}
