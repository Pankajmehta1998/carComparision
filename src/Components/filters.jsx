import React, { useEffect, useState } from "react";

const Filters = ({ onFilter, car }) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("");
  const [brands, setBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      brand: selectedBrand,
      carType: selectedCarType,
    });
  };

  useEffect(() => {
    if (car?.length) {
      // Calculate unique brands only if car data is available
      const uniqueBrands = [...new Set(car.map((item) => item?.make))];
      setBrands(uniqueBrands);

      // Calculate unique car types
      const uniqueCarTypes = [...new Set(car.map((item) => item?.transmission))];
      setCarTypes(uniqueCarTypes);
    }
  }, [car]);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow">
      {/* Price Range Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Price Range:</label>
        <select
          value={priceRange.join("-")}
          onChange={(e) => {
            const [min, max] = e.target.value.split("-")?.map(Number);
            setPriceRange([min, max]);
          }}
          className="w-full border rounded p-2"
        >
          <option value="0-100000">Any</option>
          <option value="0-20000">0 - 20,000</option>
          <option value="20000-50000">20,000 - 50,000</option>
          <option value="50000-100000">50,000 - 100,000</option>
        </select>
      </div>

      {/* Brand Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Brand:</label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Any</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Car Type Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Car Type:</label>
        <select
          value={selectedCarType}
          onChange={(e) => setSelectedCarType(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Any</option>
          {carTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-600 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;