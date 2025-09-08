"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useState } from "react";
import Modal from "../Modal";
import { Property } from "./PropertyList";
type PropertyModalProps = {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
};

const testImages = [
  "https://tse1.mm.bing.net/th/id/OIP.IVH4KKWvbTV8QKYIcvL5GAHaF3?pid=Api",
  "https://tse1.mm.bing.net/th/id/OIP.LYraXmfKndDoGf6luqBrQgHaHa?pid=Api",
  "https://tse2.mm.bing.net/th/id/OIP.dVKlZcmwVuYpozpELwvgdAHaIZ?pid=Api",
  "https://tse2.mm.bing.net/th/id/OIP.lC7EV_qSI_aiJb-HrjoL6AHaHa?pid=Api",
];

export default function PropertyModal({
  property,
  isOpen,
  onClose,
}: PropertyModalProps) {
  const [activeImage, setActiveImage] = useState(testImages[0]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fastighetsdetaljer">
      <div className="flex flex-col md:flex-row gap-6 p-4 z-50">
        {/* Vänster sektion: här ska bildgalleri in i nästa steg */}
        <div className="flex-1 border rounded-lg p-4 bg-gray-50 w-[800px]">
          <div className="flex">
            {/* Main image */}
            <div className="flex-1">
              <Image
                src={activeImage}
                alt="Main image"
                width={800}
                height={600}
                className="w-full h-auto rounded"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col gap-2 ml-4">
              {testImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border 
        ${
          activeImage === img
            ? "p-1 border-2 border-black"
            : "border-transparent"
        } 
        hover:border-blue-500`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Höger sektion: fastighetsinfo */}
        <div className="w-full md:w-1/3 border rounded-lg p-4 bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">{property.address}</h2>
          <p className="text-lg text-green-600 font-medium">
            {property.price} kr
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Status: {property.status}
          </p>

          {/* Här kan du lägga fler detaljer sen */}
          <ul className="space-y-2 text-sm">
            <li>Antal rum: ?</li>
            <li>Storlek: ? kvm</li>
            <li>Byggår: ?</li>
          </ul>

          <div className="flex flex-col gap-2 mt-5">
            <Checkbox />
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
      </div>
    </Modal>
  );
}
