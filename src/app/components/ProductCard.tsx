import { Star, Plus } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  description: string;
}

export default function ProductCard({ product }: { product?: Product }) {
  if (!product) {
    return null;
  }

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 text-white w-full h-[220px] flex flex-col cursor-pointer">
      {/* Image */}
      <div className="w-full h-[90px]">
        <Image
          width={100}
          height={100}
          loader={({ src }) => src} 
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Rating */}
      <div className="mt-2 flex items-center">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-[13px] text-[#FCF9F2] ml-1">{product.rating.toFixed(1)}</span>
      </div>

      {/* Title & Description */}
      <h3 className="text-[14px] text-[#FCF9F2] font-medium mt-1 line-clamp-2 ">{product.title}</h3>
     

      {/* Price & Button */}
      <div className="flex justify-between items-center mt-auto">
        <p className="text-[14px] font-medium">${product.price.toFixed(1)}</p>
        <button className="w-6 h-6 flex items-center justify-center">
          <Plus className="w-5 h-5 text-yellow-400" />
        </button>
      </div>
    </div>
  );
}
