import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

function Tayyor1() {
    const location = useLocation();
    const navigate = useNavigate();
    const tayyor1 = location.state;
    if (!tayyor1) {
        return <h2>Mahsulot topilmadi!</h2>;
    }

    return (
        <div>
            <Button type="primary" onClick={() => navigate("/ready-product")}>
                Tayyor maxsulotlar
            </Button>
            <h1>Mahsulot tafsilotlari</h1>
            <p><strong>Nomi:</strong> {tayyor1.nomi}</p>
            <p><strong>Miqdori:</strong> {tayyor1.miqdori}</p>
        </div>
    )
}

export default Tayyor1