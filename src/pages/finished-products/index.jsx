import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

const FinishedProducts = () => {
  const [conserveTypes, setConserveTypes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get('https://aqvo.limsa.uz/api/conserve-type', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Serverdan kelgan javob:", response.data); // API dan nima kelayotganini tekshiramiz
        if (response.data && response.data.data) {
          setConserveTypes(response.data.data);
        } else {
          setError("Kutilmagan API javobi");
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setError("Ma'lumotlarni olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>⏳ Yuklanmoqda...</p>;
  if (error) return <p style={{ color: "red" }}>❌ Xatolik: {error}</p>;

  return (
    <div>
      <section id='tayyor mahsulotlar'>
        <ul>
         {
          conserveTypes?.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          ))
         }
        </ul>
      </section>
    </div>
  );
};

export default FinishedProducts;
