import { useRef, useContext, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

import './Navbar.css';

const Navbar = ({searchTerm,setSearchTerm, filterType, setFilterType, filterParking, setFilterParking}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        restaurantName:'',
        address:'',
        type:'Rajasthan',
        parkingLot:'true',
        image:''
    })

    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem('evalData') || '[]')
        const restaurant = existingData.find(r => r.restaurantID === parseInt(id));

    if(restaurant) {
        setFormData({
            restaurantName: restaurant.restaurantName,
            address: restaurant.address,
            type: restaurant.type,
            parkingLot: restaurant.parkingLot.toString(),
            image: restaurant.image
        })
    }  
},[id]); 

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData ({...formData, [name]: value});
}
const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.restaurantName.trim() || !formData.address.trim()){
        alert('Please fill all fields');
        return;
    }

    if(!confirm('Are u sure to update restaurant')){
        return;
}

const existingData = JSON.parse(localStorage.getItem('evalData') || '[]');

const updatedData = existingData.map(r => {
    if(r.restaurantID === parseInt(id)) {
        return {
            ...r,
            restaurantName:formData.restaurantName,
            address:formData.address,
            type:formData.type,
            parkingLot:formData.parkingLot === 'true',
            image:formData.image
        }
    }
    return r;
})
localStorage.setItem('evalData',JSON.stringify(updatedData));
alert("restaurants updated successfully");
navigate("/admin/dashboard");
}
const handleCancel = () => {
    navigae('/admin/dashboard');
}

return(
    <div className="update-contain">
        <h2>UpdateRestaurant</h2>
        <form className="update-form" onSubmit={handleSubmit}>
            <div>
                <label>Restaurant name</label>
                <input
                type="text"
                name='restaurantName'
                value={formData.restaurantName}
                onChange={handleChange}
                required
                />

            </div>
            <div>
                <label>Address</label>
                <input 
                type="text"
                name = "address"
                value={formData.address}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Type</label>
                <select name = "type"
                value = {formData.type}
                onChange={handleChange}>
                    <option value= "Rajasthani">Rajasthani</option>
                    <option value= "jain">jain</option>
                    <option value= "south indian">South Indian</option>
                </select>

            </div>
            <div>
                <label>ParkingLot</label>
                <select name = "parkingLot"
                value = {formData.parkingLot}
                onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div>
                <label>ImageURL</label>
                <input 
                type = "text"
                name = "image"
                value={formData.image}
                onChange = {handleChange}
                required
                />
            </div>
            <div>
                <button type = "submit"
                className="submit-btn">Update</button>
                <button type="button"

                className="cancel-btn" onClick={handleCancel}>Delete</button>
            </div>

        </form>
    </div>
)
}

export default UpdateRestaurant;