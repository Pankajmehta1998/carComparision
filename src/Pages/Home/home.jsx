import { useState, useEffect } from "react";
import CarCard from "../../Components/CarCard";
import Loader from "../../Components/loader";
import Filters from "../../Components/filters";
// import ComparisonTable from "../components/ComparisonTable";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Check if data exists in localStorage
        const cachedData = localStorage.getItem("cars");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setCars(parsedData);
          setFilteredCars(parsedData);
        } else {
          // If no cached data, fetch from API
          const response = await fetch("/api/v1/cars");
          if (!response.ok) {
            throw new Error("Failed to fetch car data");
          }
          const data = await response.json();
          // Cache data to localStorage
          localStorage.setItem("cars", JSON.stringify(data));
          setCars(data);
          setFilteredCars(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleFilter = (filters) => {
    const { priceRange, brand, carType } = filters;
    const filtered = cars.filter(
      (car) =>
        car?.price >= priceRange[0] &&
        car?.price <= priceRange[1] &&
        (!brand || car?.make?.toLowerCase().includes(brand?.toLowerCase())) && (!carType || car?.transmission?.toLowerCase().includes(carType?.toLowerCase()))
    );
    console.log("filtered: ", filtered)
    setFilteredCars(filtered);
  };

  const handleCompare = (car) => {
    if (!selectedCars.some((c) => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleRemove = (id) => {
    setSelectedCars(selectedCars.filter((car) => car.id !== id));
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Filters onFilter={handleFilter} car={filteredCars} />
      <div className="grid">
        {filteredCars?.length > 0 &&
          <CarCard car={filteredCars} onCompare={handleCompare} />
        }
      </div>
      {/* {selectedCars.length > 0 && (
        <ComparisonTable selectedCars={selectedCars} onRemove={handleRemove} />
      )} */}
    </div>
  );
};

export default Home;
