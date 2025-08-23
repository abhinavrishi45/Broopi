// import React , { useState , useEffect} from 'react';
import React from 'react';
// import axios from 'axios';
const GetLocation = () => {
// const GetLocation = ({userId}) => {
  <div>afa</div>
//   const [coords, setCoords] = useState({ lat: 0, lng: 0 });
//   const [address, setAddress] = useState('');
//   const [society, setSociety] = useState('');

//   useEffect(()=>{
//     navigator.geolocation.getCurrentPosition(
//       async(position)=>{
//         const { latitude, longitude } = position.coords;
//         setCoords({latitude, longitude});

//         const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bc218ac03be14effa89f4e27d81dd34e`);
//         setAddress(res.data.result[0]?.formatted || 'Address Not Found');
//       },
//       (error) => alert('Location Permission denied'),
//       {enableHighAccuracy: true}
//     );
//   }, []);

//   const handleSubmit = async ()=>{
//     await axios.post('http://localhost:5000/api/location/save',{
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//       address,
//       society,
//       userId
//     });
//     onclose();
//   }
//   return (
//     <div><h2>Current Location</h2>
//       <p>Lat: {coords.latitude}, Long: {coords.longitude}</p>
//       <p>Address: {address}</p>
//       <input
//         type="text"
//         placeholder="Enter Society / Apartment"
//         value={society}
//         onChange={(e) => setSociety(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Save Location</button></div>
//   )
 }

export default GetLocation