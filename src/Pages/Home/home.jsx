import { useState, useEffect } from "react";
import CarCard from "../../Components/CarCard";
import Loader from "../../Components/loader";
import Filters from "../../Components/filters";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cachedData = localStorage.getItem("cars");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setCars(parsedData);
          setFilteredCars(parsedData);
        } else {
          // for local proxy:
          // const response = await fetch("/api/v1/cars");
          // for production:
          const response = await fetch("https://www.freetestapi.com/api/v1/cars");
          if (!response.ok) {
            throw new Error("Failed to fetch car data");
          }
          const data = await response.json();
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
    const { priceRange, brand, carType, sortOrder } = filters;

    // Filter cars based on price range, brand, and car type
    let filtered = cars.filter(
      (car) =>
        car?.price >= priceRange[0] &&
        car?.price <= priceRange[1] &&
        (!brand || car?.make?.toLowerCase().includes(brand?.toLowerCase())) &&
        (!carType || car?.transmission?.toLowerCase().includes(carType?.toLowerCase()))
    );

    // Sort cars based on selected sorting order
    if (sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(filtered);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Filters onFilter={handleFilter} car={cars} />
      <div className="grid">
        {filteredCars?.length > 0 ? (
          <CarCard car={filteredCars} />
        ) : (
          <p>No cars found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
