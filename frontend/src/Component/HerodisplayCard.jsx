import React ,{useState ,useEffect } from 'react';
import pest from '../assets/banners1746686833Pest_Control.jpg'
import ac from '../assets/banners1751888332AC.png'
import kitchen from '../assets/bannersKitchen.jpg'
import Sofaclean from '../assets/bannerssofacleaning.png'
import Carpenter from '../assets/bannerscarpenter.png'
import acservicing from '../assets/bannersAcserviving.png'
import kitchenclean from '../assets/bannerskitchencleaning.png'
import homecleaning from '../assets/bannersHomecleaninng.png'
import LongHome from '../assets/bannersHomecleaningLong.jpg'
import OC1 from '../assets/OC1.jpg'
import OC2 from '../assets/OC2.jpg'
import OC3 from '../assets/OC3.jpg'
import OC4 from '../assets/OC4.jpg'
import OC5 from '../assets/OC5.jpg'
import star from '../assets/staricon.svg'
import ACserviceLong from '../assets/ACserviceLong.jpg'
import EACone from '../assets/EAC-1.jpg'
import EACtwo from '../assets/EAC-2.jpg'
import EACthree from '../assets/EAC-3.jpg'
import EACfour from '../assets/EAC-4.jpg'
import EACfive from '../assets/EAC-5.jpg'
import Supersaver from '../assets/SupersaverLong.jpg'
import RSone from '../assets/RS-1.jpg'
import RStwo from '../assets/RS-2.jpg'
import RSthree from '../assets/RS-3.jpg'
import RSfour from '../assets/RS-4.jpg'
import BathroomLong from '../assets/BathroomLong.jpg'
import AOIone from '../assets/AOI-1.jpg'
import AOItwo from '../assets/AOI-2.jpg'
import AOIthree from '../assets/AOI-3.jpg'
import AOIfour from '../assets/AOI-4.jpg'
import AOIfive from '../assets/AOI-5.jpg'
import AOIsix from '../assets/AOI-6.jpg'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Services = () => {
  const navigate = useNavigate();
  const [homecard, setHomecard] = useState([]);

  useEffect(()=>{
    const fetchHomecard = async () =>{
    try {
    const res = await axios.get('http://localhost:5000/api/homecard/homecard');
    setHomecard(res.data);
    }catch(err){
      console.log(err);
    }
  };
  fetchHomecard();
  },[])

  return (
    <div className="p-6 space-y-10">
      <div className="grid grid-cols-1  md:grid-cols-3 ml-12 gap-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">  
        <img onClick={()=>navigate('/service/pestcontroling')} src={pest} alt="Pest Control" className="w-full h-full object-cover cursor-pointer hover:scale-104 transition-transform duration-300 ease-in-out " />
        </div>

        <div className="bg-yellow-50 rounded-xl shadow-md overflow-hidden ">
        <img onClick={()=>navigate('/service/Ac')}  src={ac} alt="AC Servicing" className="w-full h-full object-cover hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer" />
        </div>

        <div className="bg-beige-100 rounded-xl shadow-md overflow-hidden ">
        <img onClick={()=>navigate('/service/kitchen')}  src={kitchen} alt="Kitchen Cleaning" className="w-full h-full object-cover hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl ml-11 font-bold mb-6">Super Saver Services</h2>
        <div className="grid grid-cols-2 ml-12 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img onClick={()=>navigate('/service/HomeCleaning')}  src={Sofaclean} alt="Sofa Cleaning" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />  
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img onClick={()=>navigate('/service/Bathroom')}  src={Carpenter}alt="Carpenter" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />    
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img onClick={()=>navigate('/service/Ac')}  src={acservicing} className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img onClick={()=>navigate('/service/kitchen')} src={kitchenclean}alt="Kitchen Cleaning" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img onClick={()=>navigate('/service/HomeCleaning')}  src={homecleaning} alt="Home Cleaning" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />  
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md ml-12 mt-25 overflow-hidden">
        <img onClick={()=>navigate('/service/Homecleaning')}  src={LongHome} alt="Home Cleaning" className="w-full h-115  object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" /> 
      </div>
      <div>
        <h2 className="text-4xl ml-12 mt-15 mb-10 font-bold ">Clean in just One Click</h2>

        <div className="grid grid-cols-2 ml-12 md:grid-cols-5 gap-5">
          {/* <div className="bg-gray-100 rounded shadow-md overflow-hidden cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out ">
              <img src={OC1} alt="Sofa Cleaning" className="w-full h-60 object-cover " />  
              <p className='text-xl font-bold ml-1'>Home Cleaning </p>
              <p className='font-semibold ml-1 '>Home</p>
              <div className='flex flex-row'>
              <img className='h-6 w-4 ml-1' src={star} alt="" />
              <p>0 (0K)</p>
              </div>
              <p className='font-semibold ml-1 mb-2'>₹599</p>
            
          </div> */}

           {homecard.map((homecard) => (
          <div className='bg-gray-100 rounded shadow-md overflow-hidden cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out '>
             <img src={`http://localhost:5000/uploads/homeCard/${homecard.image}`} alt="Sofa Cleaning" className="w-full h-60 object-cover " />  
              <p className='text-xl font-bold ml-1'>{homecard.name} </p>
              <p className='font-semibold ml-1 '>{homecard.category}</p>
              <div className='flex flex-row'>
              <img className='h-6 w-4 ml-1' src={star} alt="" />
              <p>0 (0K)</p>
              </div>
              <p className='font-semibold ml-2'>₹ {homecard.newPrice}</p>
              <p className='font-semibold line-through ml-3 mb-2'>₹{homecard.oldPrice}</p>
          </div>
           ))}

          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out">
              <img src={OC2}alt="Carpenter" className="w-full h-60 object-cover  " /> 
              <p className='text-xl font-bold ml-1'>Home Cleaning </p>
              <p className='font-semibold ml-1 '>Home</p>
              <div className='flex flex-row'>
              <img className='h-6 w-4 ml-1' src={star} alt="" />
              <p>0 (0K)</p>
              </div>
              <p className='font-semibold ml-1 mb-2'>₹599</p>   
          </div>

          <div className="bg-gray-100 cursor-pointer rounded-xl shadow-md overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out">
              <img src={OC3} className="w-full h-60 object-cover" />
              <p className='text-xl font-bold ml-1'>Home Cleaning </p>
              <p className='font-semibold ml-1 '>Home</p>
              <div className='flex flex-row'>
              <img className='h-6 w-4 ml-1' src={star} alt="" />
              <p>0 (0K)</p>
              </div>
              <p className='font-semibold ml-1 mb-2'>₹599</p>
          </div>

          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out">
              <img src={OC4}alt="Kitchen Cleaning" className="w-full h-60 object-cover " />
              <p className='text-xl font-bold ml-1'>Home Cleaning </p>
              <p className='font-semibold ml-1 '>Home</p>
              <div className='flex flex-row'>
              <img className='h-6 w-4 ml-1' src={star} alt="" />
              <p>0 (0K)</p>
              </div>
              <p className='font-semibold ml-1 mb-2'>₹599</p>
          </div>

          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
              <img src={OC5} alt="Home Cleaning" className="w-full h-60 object-cover " /> 
              <p className='text-xl font-bold ml-1'>Home Cleaning </p>
              <p className='font-semibold ml-1 '>Home</p>
              <div className='flex flex-row'>
              <img className='h-6 w-4 ml-1' src={star} alt="" />
              <p>0 (0K)</p>
              </div>
              <p className='font-semibold ml-1 mb-2'>₹599</p> 
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md ml-12 mt-25 overflow-hidden">
        <img onClick={()=>navigate('/service/Ac')} src={ACserviceLong} alt="Home Cleaning" className="w-full h-130  object-cover hover:scale-101 transition-transform duration-300 ease-in-out cursor-pointer" /> 
      </div>
      <div>
        <h2 className="text-3xl ml-11 font-bold mt-20">Electrician and AC Services</h2>
        <div className="grid grid-cols-2 ml-12 mt-10 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={EACone} alt="EAC-1" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" /> 
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={EACtwo}alt="EAC-2" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />    
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={EACthree} className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={EACfour}alt="EAC-4" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={EACfive} alt="EAC-5" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />  
          </div>
        </div>
      </div>
       <div className="bg-white shadow-md ml-12 mt-25 overflow-hidden">
        <img src={Supersaver} alt="Home Cleaning" className="w-full h-120  object-cover hover:scale-101 transition-transform duration-300 ease-in-out cursor-pointer" /> 
      </div>
      <div>
        <h2 className="text-3xl ml-11 font-bold mt-20">Reliable Services</h2>
        <div className="grid grid-cols-2 ml-15 mt-10 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={RSone} alt="EAC-1" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" /> 
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={RStwo}alt="EAC-2" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />    
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={RSthree} className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={RSfour}alt="EAC-4" className="w-full h-60 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

        </div>
      </div>
       <div className="bg-white shadow-md ml-12 mt-25 overflow-hidden">
        <img src={BathroomLong} alt="Home Cleaning" className="w-full h-120 object-cover hover:scale-101 transition-transform duration-300 ease-in-out cursor-pointer" /> 
      </div>
      <div>
        <h2 className="text-3xl ml-11 font-bold mt-20">Electrician and AC Services</h2>
        <div className="grid grid-cols-2 ml-12 mt-10 md:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={AOIone} alt="EAC-1" className="w-full h-70 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" /> 
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={AOItwo}alt="EAC-2" className="w-full h-70 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />    
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={AOIthree} className="w-full h-70 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={AOIfour}alt="EAC-4" className="w-full h-70 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={AOIfive} alt="EAC-5" className="w-full h-70 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />  
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={AOIsix} alt="EAC-5" className="w-full h-70 object-cover hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer" />  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
