'use client'
import { Chip } from "@/components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";


interface Category {
  id_categoria: number;
  nombre_categoria: string;
}
interface CategoriesContainerProps {
  categories: Category[];
}
export const CategoriesContainer = ({ categories }: CategoriesContainerProps) => {
  const chipScrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!chipScrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = chipScrollRef.current;
      setAtStart(scrollLeft <= 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // -1 for float precision
    };
    const ref = chipScrollRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    // Check on mount
    handleScroll();
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 mx-2 sm:mx-5 justify-center py-2">
      {!atStart && (
        <button
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
          onClick={() => {
            chipScrollRef.current && (chipScrollRef.current.scrollLeft -= 100);
          }}
          aria-label="Retroceder chips"
        >
          <FaChevronLeft />
        </button>
      )}
      <div
        ref={chipScrollRef}
        className="flex gap-4 overflow-x-hidden whitespace-nowrap scrollbar-hide"
        style={{ scrollBehavior: 'smooth', maxWidth: '100%' }}
      >
        {categories.map((cat, idx) => (
          <Chip key={cat.id_categoria} color={idx % 6 === 0 ? 'default' : idx % 6 === 1 ? 'primary' : idx % 6 === 2 ? 'secondary' : idx % 6 === 3 ? 'success' : idx % 6 === 4 ? 'warning' : 'danger'}>
            {cat.nombre_categoria}
          </Chip>
        ))}
      </div>
      {!atEnd && (
        <button
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
          onClick={() => {
            chipScrollRef.current && (chipScrollRef.current.scrollLeft += 100);
          }}
          aria-label="Avanzar chips"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};