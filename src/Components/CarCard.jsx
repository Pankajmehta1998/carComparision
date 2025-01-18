import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="max-w-[1366px] mx-auto px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[26px] text-[#484848] font-semibold">Get Offers on Popular Cars</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {car?.map((car, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="relative p-6 pb-4">
              <img
                src={car?.image}
                alt={`${car?.model}`}
                className="w-full h-[160px] object-contain mb-3"
                loading="lazy"
              />
              <h2 className="text-lg text-[#484848] font-medium mb-2">{`${car?.model}`}</h2>
              <div className="flex items-baseline mb-2">
                <span className="text-[#484848] font-medium"><strong>Brand:</strong> {car?.make}</span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-[#484848] font-medium"><strong>Price: </strong>{car?.price} Lakh</span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-[#484848] font-medium"><strong>Transmission: </strong>{car?.transmission}</span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-[#484848] font-medium"><strong>Features: </strong>{car?.features?.join(", ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCard;
