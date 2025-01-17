import React from "react";

const CarCard = ({ car, onCompare }) => {
  return (
    <div className="max-w-[1366px] mx-auto px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[26px] text-[#484848] font-semibold">Get Offers on Popular Cars</h1>
        <div className="bg-[#2C2C2C] text-white rounded-lg flex items-center px-6 py-3">
          <div className="mr-4 border-r pr-4 border-gray-600">
            <div className="text-sm font-medium">Buying a New Car?</div>
          </div>
          <div className="flex items-center">
            <span className="text-sm">(Toll free)</span>
            <span className="ml-2 text-lg font-medium">08068441441</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {car?.map((car, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="relative p-6 pb-4">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-[160px] object-contain mb-3"
              />
              <h2 className="text-lg text-[#484848] font-medium mb-2">{`${car.model}`}</h2>
              <div className="flex items-baseline mb-2">
                <span className="text-[#484848] font-medium">Rs. {car.price} Lakh</span>
                <span className="text-sm text-gray-500 ml-1">onwards</span>
              </div>
              <a
                href="#"
                className="text-[#2C72F8] hover:text-blue-700 text-sm font-medium"
              >
                Check On Road Price
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-[26px] text-[#484848] font-semibold">All Brands</h2>
      </div>
    </div>
  );
};

export default CarCard;
