"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Download, Maximize2, XIcon } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const photoUrls = ["./mate.jpeg", "./ghibli.png", "./class.jpeg", "./snow.png", "./airport.png", "./travel.png", "./jojo.png"];
type PhotoCarouselProps = {
  extraImages?: string[];
};
export default function PhotoCarousel({ extraImages = [] }: PhotoCarouselProps) {
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);
  const allPhotos = [...extraImages, ...photoUrls]; // novas primeiro
  return (
    <div className="w-full max-w-5xl mb-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        spaceBetween={20}
        slidesPerView={2.5}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="custom-swiper-nav"
      >
        {allPhotos.map((url, i) => (
          <SwiperSlide key={i} className="relative group">
            <img src={url} alt={`Foto ${i + 1}`} className="rounded-xl w-full h-64 object-cover shadow-md" />
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <a href={url} download className="bg-white/30 p-1 rounded-full hover:bg-white">
                <Download size={18} />
              </a>
              <button onClick={() => setZoomUrl(url)} className="bg-white/30 p-1 rounded-full hover:bg-white">
                <Maximize2 size={18} />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {zoomUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative">
            <img src={zoomUrl} alt="Zoom" className="max-h-[90vh] max-w-[90vw] rounded-lg" />
            <button
              onClick={() => setZoomUrl(null)}
              className="absolute top-2 right-2 bg-white/30 px-2 py-1 rounded-md font-medium text-sm hover:bg-white cursor-pointer"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
