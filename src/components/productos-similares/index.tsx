"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/interfaces";
import { ProductGridItem } from "../products/product-grid/ProductGridItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  products: Product[];
}

export const ProductSimilares = ({ products }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const speed = 0.5;
    let animationId: number;

    const scroll = () => {
      if (!paused && container) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [paused]);

  const duplicatedProducts = [...products, ...products];

  const handlePrev = () => {
    if (containerRef.current) {
      setPaused(true); // Pausa autoplay
      containerRef.current.scrollLeft -= 200;
      setTimeout(() => setPaused(false), 2000); // Reanuda después de 2s
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      setPaused(true);
      containerRef.current.scrollLeft += 200;
      setTimeout(() => setPaused(false), 2000);
    }
  };

  return (
    <div className="relative">
      {/* Botón Anterior */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-[40%] -translate-y-1/2 z-10 bg-white/80 hover:bg-gray-400 rounded-full p-2 shadow-md"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Contenedor del slider */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex gap-6 mb-10">
          {duplicatedProducts.map((product, index) => (
            <div
              key={`${product.slug}-${index}`}
              className="flex-shrink-0 w-60"
            >
              <ProductGridItem product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-[40%] -translate-y-1/2 z-10 bg-white/80 hover:bg-gray-400 rounded-full p-2 shadow-md"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};