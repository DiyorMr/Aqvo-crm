// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FinishedProducts = () => {
//   const [conserveTypes, setConserveTypes] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const response = await axios.get('https://aqvo.limsa.uz/api/conserve-type', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Serverdan kelgan javob:", response.data); // API dan nima kelayotganini tekshiramiz
//         if (response.data && response.data.data) {
//           setConserveTypes(response.data.data);
//         } else {
//           setError("Kutilmagan API javobi");
//         }
//       } catch (error) {
//         console.error("Xatolik yuz berdi:", error);
//         setError("Ma'lumotlarni olishda xatolik yuz berdi");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>⏳ Yuklanmoqda...</p>;
//   if (error) return <p style={{ color: "red" }}>❌ Xatolik: {error}</p>;

//   return (
//     <div>
//       <section id='tayyor mahsulotlar'>
//         <ul>
//          {
//           conserveTypes?.map((item) => (
//             <div key={item.id}>
//               <p>{item.name}</p>
//             </div>
//           ))
//          }
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default FinishedProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";

const FinishedProducts = () => {
  const [conserveTypes, setConserveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Statik token
  const TOKEN = "YOUR_STATIC_TOKEN_HERE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://aqvo.limsa.uz/api/conserve-type", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        console.log("Serverdan kelgan javob:", response.data);

        if (response.data?.data && Array.isArray(response.data.data)) {
          setConserveTypes(response.data.data);
        } else {
          setError("Kutilmagan API javobi");
        }
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
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
      <section id="tayyor-mahsulotlar">
        <ul>
          {conserveTypes.length > 0 ? (
            conserveTypes.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
              </div>
            ))
          ) : (
            <p>🔍 Ma'lumot topilmadi</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default FinishedProducts;
