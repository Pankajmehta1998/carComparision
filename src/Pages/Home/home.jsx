import { useState, useEffect } from "react";
import CarCard from "../../Components/CarCard";
// import Filters from "../components/Filters";
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
        const response = await fetch("/api/v1/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        console.log("data:", data)
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleFilter = (filters) => {
    const { priceRange, brand } = filters;
    const filtered = cars.filter(
      (car) =>
        car.price >= priceRange[0] &&
        car.price <= priceRange[1] &&
        (!brand || car.brand.toLowerCase().includes(brand.toLowerCase()))
    );
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

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <Filters onFilter={handleFilter} /> */}
      <div className="grid">
        {filteredCars?.length>0 &&
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
