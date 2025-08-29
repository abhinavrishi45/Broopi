import React, { useState, useEffect } from 'react';
import Sofaclean from '../assets/bannerssofacleaning.png'
import Carpenter from '../assets/bannerscarpenter.png'
import acservicing from '../assets/bannersAcserviving.png'
import kitchenclean from '../assets/bannerskitchencleaning.png'
import homecleaning from '../assets/bannersHomecleaninng.png'
import star from '../assets/staricon.svg'
import EACone from '../assets/EAC-1.jpg'
import EACtwo from '../assets/EAC-2.jpg'
import EACthree from '../assets/EAC-3.jpg'
import EACfour from '../assets/EAC-4.jpg'
import EACfive from '../assets/EAC-5.jpg'
import RSone from '../assets/RS-1.jpg'
import RStwo from '../assets/RS-2.jpg'
import RSthree from '../assets/RS-3.jpg'
import RSfour from '../assets/RS-4.jpg'
import AOIone from '../assets/AOI-1.jpg'
import AOItwo from '../assets/AOI-2.jpg'
import AOIthree from '../assets/AOI-3.jpg'
import AOIfour from '../assets/AOI-4.jpg'
import AOIfive from '../assets/AOI-5.jpg'
import AOIsix from '../assets/AOI-6.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getOneProductPerCategory } from '../features/cart/cartSlice';
const Services = () => {
  const navigate = useNavigate();
  const [homecard, setHomecard] = useState([]);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [longBanner, setLongBanner] = useState([])

  // useEffect(()=>{
  //   const fetchHomecard = async () =>{
  //   try {
  //   const res = await axios.get('http://localhost:5000/api/homecard/homecard');
  //   setHomecard(res.data);
  //   }catch(err){
  //     console.log(err);
  //   }
  // };
  // fetchHomecard();
  // },[])

  useEffect(() => {
    axios.get("http://localhost:5000/api/firstcard")
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/LongBanner")
      .then((res) => setLongBanner(res.data))
      .catch((err) => console.error(err));
  })

  useEffect(() => {
    getOneProductPerCategory().then((data) => {
      setHomecard(data);
    });
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % cards.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 space-y-16 max-w-7xl mx-auto">

      <div className="relative w-full">
        {cards.length > 0 && (
          <div className="rounded-2xl relative">
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
                <img
                  src={`http://localhost:5000/uploads/FirstCard/${cards[index].image}`}
                  alt={cards[index].name}
                  className="w-130 h-56 sm:h-64 lg:h-56 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate(`/service/${cards[index].category}`)}
                />
                {cards[(index + 1) % cards.length] && (
                  <img
                    src={`http://localhost:5000/uploads/FirstCard/${cards[(index + 1) % cards.length].image}`}
                    alt={cards[(index + 1) % cards.length].name}
                    className="w-full h-56 sm:h-64 lg:h-56 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate(`/service/${cards[(index + 1) % cards.length].category}`)}
                  />
                )}
                {cards[(index + 2) % cards.length] && (
                  <img
                    src={`http://localhost:5000/uploads/FirstCard/${cards[(index + 2) % cards.length].image}`}
                    alt={cards[(index + 2) % cards.length].name}
                    className="w-full h-56 sm:h-64 lg:h-56 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate(`/service/${cards[(index + 2) % cards.length].category}`)}
                  />
                )}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
            >
              ◀
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Super Saver Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Sofaclean, Carpenter, acservicing, kitchenclean, homecleaning].map((img, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={img}
                alt={`service-${i}`}
                className="w-full h-48 sm:h-60 object-cover hover:scale-105 transition cursor-pointer lg:h-50 lg:w-60"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        {longBanner[0] && (
          <img
            onClick={() => navigate(`/service/${longBanner[0].category}`)}
            src={`http://localhost:5000/uploads/longBanner/${longBanner[0].image}`}
            alt="Banner"
            className="w-full h-40 sm:h-56 lg:h-100 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
          />
        )}
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Clean in just One Click</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-25 lg:w-full">
          {homecard.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/service/${item.category}`)}
              className="bg-gray-100 rounded shadow-md overflow-hidden cursor-pointer hover:scale-105 transition lg:w-60"
            >
              <img
                src={`http://localhost:5000/uploads/allproducts/${item.image}`}
                alt={item.name}
                className="w-full h-48 sm:h-60 object-cover"
              />
              <div className="p-2">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-sm font-medium text-gray-600">{item.category}</p>
                <div className="flex items-center space-x-1 text-sm">
                  <img className="h-4 w-4" src={star} alt="rating" />
                  <p>0 (0K)</p>
                </div>
                <p className="font-semibold">₹ {item.newPrice}</p>
                <p className="text-gray-500 line-through">₹{item.oldPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        {longBanner[1] && (
          <img
            onClick={() => navigate(`/service/${longBanner[1].category}`)}
            src={`http://localhost:5000/uploads/longBanner/${longBanner[1].image}`}
            alt="Banner"
            className="w-full h-40 sm:h-56 lg:h-100 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
          />
        )}
      </section>
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Electrician and AC Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[EACone, EACtwo, EACthree, EACfour, EACfive].map((img, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={img}
                alt={`service-${i}`}
                className="w-full h-48 sm:h-60 object-cover hover:scale-105 transition cursor-pointer lg:h-50 "
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        {longBanner[2] && (
          <img
            onClick={() => navigate(`/service/${longBanner[2].category}`)}
            src={`http://localhost:5000/uploads/longBanner/${longBanner[2].image}`}
            alt="Banner"
            className="w-full h-40 sm:h-56 lg:h-100 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
          />
        )}
      </section>


      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Reliable Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[RSone, RStwo, RSthree, RSfour].map((img, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={img}
                alt={`service-${i}`}
                className="w-full h-48 sm:h-60 object-cover hover:scale-105 transition cursor-pointer lg:h-50"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        {longBanner[3] && (
          <img
            onClick={() => navigate(`/service/${longBanner[3].category}`)}
            src={`http://localhost:5000/uploads/longBanner/${longBanner[3].image}`}
            alt="Banner"
            className="w-full h-40 sm:h-56 lg:h-100 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
          />
        )}
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Reliable Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[AOIone, AOItwo, AOIthree, AOIfour, AOIfive].map((img, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={img}
                alt={`service-${i}`}
                className="w-full h-48 sm:h-65 object-cover hover:scale-105 transition cursor-pointer lg:h-65 md:h-65"
              />
            </div>
          ))}
        </div>
      </section>
    </div >
  );
};

export default Services;

