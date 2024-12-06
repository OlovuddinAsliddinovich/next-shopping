"use client";

import { ProductType } from "@/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/image";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
// import ReactStars from "react-stars";

const ProductDetailedPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>();
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  const openModalHandler = () => {
    setOpen(!open);
    router.back();
  };

  const handleClick = () => {
    const products: ProductType[] = JSON.parse(localStorage.getItem("carts") as string) || [];
    const existProduct = products.find((prod) => prod.id === product?.id);
    if (existProduct) {
      const updatedProducts = products.map((prod) => {
        if (prod.id === product?.id) {
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        }
        return prod;
      });
      localStorage.setItem("carts", JSON.stringify(updatedProducts));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(data));
    }
    toast.success("Product added to cart!", { autoClose: 1000, position: "top-center" });
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await response.json();
      setProduct(product);
      setLoading(false);
    }

    getData();
  }, [id]);
  return (
    <Dialog open={open} onClose={openModalHandler} className={"relative z-50"}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={`mx-auto max-w-3xl rounded bg-white p-10`}>
            {loading ? (
              <div className="w-8 h-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <>
                <div className="flex gap-x-8 h-96">
                  {product?.image && (
                    <div className="relative w-72 h-full hidden md:inline">
                      <CustomImage product={product} fill />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col">
                    <div className="flex-1">
                      <h4 className="font-semibold">{product?.title}</h4>
                      <p className="font-medium text-sm">${product?.price}</p>
                      <div className="flex items-center">
                        <p>{product?.rating?.rate}</p>
                        {product?.rating?.rate && (
                          <div className=" flex items-center ml-2 mr-6">
                            {Array.from({ length: Math.floor(product?.rating?.rate) }, (_, idx) => (
                              <StarIcon key={idx} className="h-5 w-5 text-yellow-500" />
                            ))}
                            {Array.from({ length: 5 - Math.floor(product?.rating?.rate) }, (_, idx) => (
                              <StarIconOutline key={idx} className="h-5 w-5 text-yellow-500" />
                            ))}
                            {/* <ReactStars value={product?.rating?.rate} edit={false} /> */}
                          </div>
                        )}
                        <p className="text-xs cursor-pointer text-blue-600 hover:underline">See all {product?.rating?.count} reviews</p>
                      </div>
                      <p className="mt-4 line-clamp-6">{product?.description}</p>
                    </div>
                    <div className="space-y-2 text-sm mt-4">
                      <button
                        onClick={handleClick}
                        className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                      >
                        Add to bag
                      </button>
                      <button
                        onClick={() => window.location.reload()}
                        className="button w-full bg-transparent text-black border-blue-600 hover:border-transparent hover:bg-blue-600 hover:text-white"
                      >
                        View full detail
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailedPage;
