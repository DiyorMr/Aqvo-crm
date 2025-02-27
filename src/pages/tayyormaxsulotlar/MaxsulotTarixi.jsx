import React, { useState, useEffect } from "react";
import { Table, DatePicker } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function MaxsulotTarixi() {
    const [dates, setDates] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); //  Dastlab bo‘sh

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accToken = localStorage.getItem("accToken");
                if (!accToken) {
                    console.error("Token topilmadi! Iltimos, tizimga qayta kiring.");
                    return;
                }

                const response = await axios.get("https://aqvo.limsa.uz/api/conserve-type", {
                    headers: { Authorization: `Bearer ${accToken}` },
                });

                if (response.data && Array.isArray(response.data.data)) {
                    const formattedData = response.data.data.map((item, index) => ({
                        key: item.id || index,
                        no: index + 1,
                        nomi: item.conserveType || "Noma'lum",
                        miqdori: item.amount || "Mavjud emas",
                        kelgan_vaqti: item.createdAt || "Noma'lum",
                        maxsulot_biriktirilganmi: item.isAttached ? "Ha" : "Yo'q",
                    }));

                    setAllProducts(formattedData);
                } else {
                    console.error("API noto‘g‘ri javob qaytardi.");
                }
            } catch (error) {
                console.error("Xatolik:", error);
            }
        };

        fetchData();
    }, []);

    const handleDateChange = (values) => {
        setDates(values);

        if (values && values.length === 2) {
            const [startDate, endDate] = values.map(date => dayjs(date).format("YYYY-MM-DD"));

            const filtered = allProducts.filter((item) => {
                const itemDate = dayjs(item.kelgan_vaqti).format("YYYY-MM-DD");
                return itemDate >= startDate && itemDate <= endDate;
            });

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]); // Sana tanlanmasa, ma’lumotlar tozalanadi
        }
    };

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Nomi", dataIndex: "nomi", key: "nomi" },
        { title: "Miqdori", dataIndex: "miqdori", key: "miqdori" },
        { title: "Kelgan vaqti", dataIndex: "kelgan_vaqti", key: "kelgan_vaqti" },
        { title: "Mahsulot biriktirilganmi", dataIndex: "maxsulot_biriktirilganmi", key: "maxsulot_biriktirilganmi" },
    ];

    return (
        <div>
            <div className="flex items-center justify-between">
                <Link to="/ready-product" className="flex items-center gap-2 text-blue-500 mb-5">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="none"
                            strokeWidth="2"
                            d="M2,12 L22,12 M13,3 L22,12 L13,21"
                            transform="matrix(-1 0 0 1 24 0)"
                        ></path>
                    </svg>
                    Maxsulotlar
                </Link>

                {/*  **Sana tanlash inputi** */}
                <div style={{ padding: 20 }}>
                    <RangePicker
                        value={dates}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
                    />
                </div>
            </div>

            {/* **Jadval (har doim ko‘rinadi, lekin ma’lumot faqat sana tanlanganda chiqadi)** */}
            <Table columns={columns} dataSource={filteredProducts} />
        </div>
    );
}

export default MaxsulotTarixi;
