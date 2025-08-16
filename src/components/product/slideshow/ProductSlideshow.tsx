'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
  /** Altura máxima (px) del bloque completo en desktop. */
  maxHeight?: number; // default 560
  /** Altura de la tira de miniaturas (px). */
  thumbsHeight?: number; // default 88
  /** Número de miniaturas visibles aprox. en desktop. */
  thumbsPerView?: number; // default 5
}

export const ProductSlideshow = ({
  images,
  title,
  className = '',
  maxHeight = 560,
  thumbsHeight = 88,
  thumbsPerView = 5,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  // Altura del carrusel principal = total - miniaturas - gap
  const gap = 10; // px entre carruseles
  const mainHeight = Math.max(200, maxHeight - thumbsHeight - gap);

  return (
    <div
      className={['overflow-hidden rounded-2xl', className].join(' ')}
      style={{ maxHeight }}
    >
      {/* Carrusel principal */}
      <div style={{ height: mainHeight }} className="relative">
        <Swiper
          style={
            {
              // @ts-ignore vars custom
              '--swiper-navigation-color': '#111',
              '--swiper-pagination-color': '#111',
              height: '100%',
            } as React.CSSProperties
          }
          spaceBetween={8}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="h-full"
          observer
          observeParents
        >
          {images.map((image) => (
            <SwiperSlide key={image} className="h-full">
              <div className="relative h-full w-full bg-white">
                <Image
                  src={`/products/${image}`}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Miniaturas */}
      <div style={{ height: thumbsHeight }} className="mt-[10px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={Math.max(3, thumbsPerView)}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-full"
          breakpoints={{
            0: { slidesPerView: 4 },
            640: { slidesPerView: Math.max(4, thumbsPerView - 1) },
            1024: { slidesPerView: thumbsPerView },
            1440: { slidesPerView: thumbsPerView + 1 },
          }}
          observer
          observeParents
        >
          {images.map((image) => (
            <SwiperSlide key={image} className="h-full">
              {/* Contenedor con altura explícita para que la imagen fill se renderice */}
              <div
                className="relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-white"
                style={{ height: thumbsHeight }}
              >
                <Image
                  src={`/products/${image}`}
                  alt={`${title} miniatura`}
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  className="object-contain"
                  priority={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
