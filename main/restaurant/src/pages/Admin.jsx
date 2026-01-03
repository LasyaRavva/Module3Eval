import { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import './Admin.css';

const Admin =() => {
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
    })

    return(
        <div className="admin-dashboard">
            <Sidebar
            onAddRestaurant = {loadRestaurants} />
            <div className="main-content">
                <Navbar
                searchTerm ={searchTerm}
                setSearchTerm = {setSearchTerm}
                filterType = {filterType}
                setFilterType = {setFilterType}
                filterParking = {filterParking}
                setFilterParking = {setFilterParking}
                />
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
                        <p className="no-restaurants">No restaurants</p>     
                )}
                </div>
            </div>
        </div>
    )
}

export default Admin;