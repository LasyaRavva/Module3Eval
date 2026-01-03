import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import './Customer.css';

const Customer =() => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [ filterParking, setFilterParking] = useState('All');

    const loadRestaurants = () => {
        const data = JSON.parse(localStorage.getItem('evalData') || '[]');
        setRestaurants(data);
    }

    useEffect(() => {
        loadRestaurants();

    },[]);

    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch = restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
        || restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'All' || restaurant.type === filterType;

        const matchesParking = filterParking === 'All' || restaurant.parkingLot.toString() === filterParking;

        return matchesSearch && matchesType && matchesParking;
    })

    return(
        <div className="customer-dashboard">
                <Navbar
                searchTerm ={searchTerm}
                setSearchTerm = {setSearchTerm}
                filterType = {filterType}
                setFilterType = {setFilterType}
                filterParking = {filterParking}
                setFilterParking = {setFilterParking}
                />
                <div className="customer-content">
                    <div className="restaurants-grid">
                    {filteredRestaurants.length> 0 ? (filteredRestaurants.map(restaurant => (
                        <RestaurantCard
                        key = {restaurant.restaurantID}
                        restaurant ={restaurant}
                        isAdmin = {true}
                        onDelete = {loadRestaurants}
                        />
                    
                    ))
                    ):(  
                        <p className="no-restaurants">No restaurants found</p>     
                )}
                </div>
            </div>
        </div>
    )
}

export default Customer;