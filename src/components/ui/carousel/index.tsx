'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const images = [
    { src: "1.png", title: "Banner 1" },
    { src: "2.png", title: "Banner 2" },
    { src: "3.png", title: "Banner 3" }
];

export const CarouselBanner = () => {
    return (
        <div className="mx-4 xl:x-5">
            <div className="w-full max-w-[1200px] h-[230px] md:h-[300px] lg:h-[400px] mx-auto rounded-3xl overflow-hidden">
                <Swiper
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    modules={[FreeMode, Autoplay, Pagination]}
                    className="rounded-3xl h-full"
                >
                    {images.map(({ src, title }) => (
                        <SwiperSlide key={src}>
                            <div className="relative w-full h-[230px] md:h-[300px] lg:h-[400px] rounded-3xl overflow-hidden">
                                <Image
                                    src={`/portadas/${src}`}
                                    alt={title}
                                    fill
                                    className="object-contain rounded-3xl"
                                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 95vw, 1200px"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};