import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide, sizeGuideCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const kurtiSizes = [
    { size: 'XS', bustIn: '32', waistIn: '28', hipIn: '36', lengthIn: '44', bustCm: '81', waistCm: '71', hipCm: '91', lengthCm: '112' },
    { size: 'S', bustIn: '34', waistIn: '30', hipIn: '38', lengthIn: '44', bustCm: '86', waistCm: '76', hipCm: '96', lengthCm: '112' },
    { size: 'M', bustIn: '36', waistIn: '32', hipIn: '40', lengthIn: '45', bustCm: '91', waistCm: '81', hipCm: '101', lengthCm: '114' },
    { size: 'L', bustIn: '38', waistIn: '34', hipIn: '42', lengthIn: '45', bustCm: '96', waistCm: '86', hipCm: '106', lengthCm: '114' },
    { size: 'XL', bustIn: '40', waistIn: '36', hipIn: '44', lengthIn: '46', bustCm: '101', waistCm: '91', hipCm: '111', lengthCm: '116' },
    { size: 'XXL', bustIn: '42', waistIn: '38', hipIn: '46', lengthIn: '46', bustCm: '106', waistCm: '96', hipCm: '116', lengthCm: '116' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FDFBF7] rounded-lg max-w-2xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#8C1D40]" />
            <h3 className="font-serif text-xl text-[#1A1818]">
              Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-1.5 text-[#7A736E] hover:text-[#1A1818] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#5C5551]">
              Measurements reflect garment dimensions. We suggest choosing 2 inches larger than your natural body bust for comfortable drape.
            </p>

            {/* Units Toggle */}
            <div className="flex bg-[#EAE3D9] p-0.5 rounded text-xs">
              <button
                onClick={() => setActiveTab('inches')}
                className={`px-3 py-1 rounded transition-colors font-medium ${
                  activeTab === 'inches' ? 'bg-[#1A1818] text-white' : 'text-[#5C5551]'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setActiveTab('cm')}
                className={`px-3 py-1 rounded transition-colors font-medium ${
                  activeTab === 'cm' ? 'bg-[#1A1818] text-white' : 'text-[#5C5551]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="border border-[#EAE3D9] rounded overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F7F3EB] text-[#1A1818] uppercase tracking-wider font-semibold border-b border-[#EAE3D9]">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Bust ({activeTab})</th>
                  <th className="py-2.5 px-3">Waist ({activeTab})</th>
                  <th className="py-2.5 px-3">Hip ({activeTab})</th>
                  <th className="py-2.5 px-3">Length ({activeTab})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1] tabular-nums text-[#383432]">
                {kurtiSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF7F0]">
                    <td className="py-2.5 px-3 font-semibold text-[#8C1D40]">{row.size}</td>
                    <td className="py-2.5 px-3">{activeTab === 'inches' ? row.bustIn : row.bustCm}</td>
                    <td className="py-2.5 px-3">{activeTab === 'inches' ? row.waistIn : row.waistCm}</td>
                    <td className="py-2.5 px-3">{activeTab === 'inches' ? row.hipIn : row.hipCm}</td>
                    <td className="py-2.5 px-3">{activeTab === 'inches' ? row.lengthIn : row.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Saree & Unstitched Note */}
          <div className="bg-[#F7F3EB] p-4 rounded border border-[#EAE3D9] text-xs space-y-2 text-[#4A4543]">
            <div className="font-semibold text-[#1A1818] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#8C1D40]" />
              <span>Saree & Dress Material Dimensions:</span>
            </div>
            <p>
              • <strong>Sarees:</strong> All sarees are standard 5.5 meters in drape length, accompanied by an attached 0.8 meter unstitched blouse fabric matching the pallu border.
            </p>
            <p>
              • <strong>Dress Materials:</strong> Kurta Top: 2.5 meters | Bottom Salwar/Pant: 2.5 meters | Dupatta: 2.3–2.5 meters. Suitable for custom tailoring up to size 4XL.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F7F3EB] border-t border-[#EAE3D9] flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="px-4 py-2 bg-[#1A1818] text-white text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
