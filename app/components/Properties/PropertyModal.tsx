"use client"

import Modal from "../Modal"
import { Property } from "./PropertyList"

type PropertyModalProps = {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export default function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fastighetsdetaljer">
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Vänster sektion: här ska bildgalleri in i nästa steg */}
        <div className="flex-1 border rounded-lg p-4 bg-gray-50">
          <p className="text-sm text-gray-500">[Bildgalleri placeholder]</p>
        </div>

        {/* Höger sektion: fastighetsinfo */}
        <div className="w-full md:w-1/3 border rounded-lg p-4 bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">{property.address}</h2>
          <p className="text-lg text-green-600 font-medium">{property.price} kr</p>
          <p className="text-sm text-gray-600 mb-4">Status: {property.status}</p>

          {/* Här kan du lägga fler detaljer sen */}
          <ul className="space-y-2 text-sm">
            <li>Antal rum: ?</li>
            <li>Storlek: ? kvm</li>
            <li>Byggår: ?</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
