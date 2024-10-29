import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from './Article';

const ProductList = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        //const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/phones`);
        const response = {
          data: {
            brand: "Iphone 14",
            model: "14 series",
            price: "200$",
            image: "ll",
          }
        }
        setPhones(response.data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };

    fetchPhones();
  }, []);

  return (
    <div>
      {phones.map((phone) => (
        <Article
          key={phone._id}
          brand={phone.brand}
          model={phone.model}
          price={phone.price}
          imageUrl={phone.images?.[0] || ''}
          description={`${phone.specs.display.size}" ${phone.specs.display.resolution} ${phone.specs.display.type} display, ${phone.specs.camera.main} / ${phone.specs.camera.selfie} camera, ${phone.specs.processor}, ${phone.specs.ram} RAM, ${phone.specs.storage} storage, ${phone.specs.battery} battery`}
        />
      ))}
    </div>
  );
};

export default ProductList;