"use client";
import { ProductType } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import CustomImage from "./image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="h-96 flex flex-col p-6 rounded-lg border group hover:scale-105 transition-transform ease-out duration-200"
    >
      <div className="relative w-full max-h-72 flex-1">
        <CustomImage product={product} fill />
      </div>
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mt-5">{product.category}</h3>
      <h2 className="text-lg text-gray-900 font-semibold mb-4">
        <div className="flex justify-between mt-4 mb-1">
          <div className="w-44 truncate">{product.title}</div>
          <div>${product.price}</div>
        </div>
      </h2>
      <p className="leading-relaxed text-base line-clamp-2">{product.description}</p>
    </Link>
  );
};

export default Product;
