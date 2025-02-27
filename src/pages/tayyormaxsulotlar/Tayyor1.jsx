import React, { useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "antd";

function Tayyor1() {
    const location = useLocation();
    const navigate = useNavigate();
    const tayyor1 = location.state;
    if (!tayyor1) {
        return <h2>Mahsulot topilmadi!</h2>;
    }

    const columns = [
        { title: 'No', dataIndex: 'no', key: 'no' },
        { title: 'Nomi', dataIndex: 'nomi', key: 'nomi' },
        { title: 'Miqdori', dataIndex: 'miqdori', key: 'miqdori' },
        { title: 'Kelgan vaqti', dataIndex: 'kelgan vaqti', key: 'actions', },
        { title: 'Maxsulot biriktirilganmi', dataIndex: 'maxsulot biriktirilganmi', key: 'actions', },
    ];

    const dataSource = [
        {
            key: '1',
            no: 1,
            nomi: tayyor1.nomi,
            miqdori: tayyor1.miqdori,
            kelgan_vaqti: Array.isArray(tayyor1.data) && tayyor1.data.length > 0 &&
                Array.isArray(tayyor1.data[0].productConsumptions) && tayyor1.data[0].productConsumptions.length > 0
                ? tayyor1.data[0].productConsumptions[0]?.product?.lastUpdatedAt || "Ma'lumot yo‘q"
                : "Hozircha yo'q",
            maxsulot_biriktirilganmi: "maxsulot biriktirilgan"
        }
    ]

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='mb-5'>
                    <Button type='primary' onClick={() => navigate("/ready-product")}>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M2,12 L22,12 M13,3 L22,12 L13,21" transform="matrix(-1 0 0 1 24 0)"></path></svg>
                        Tayyor maxsulotlar
                    </Button>
                </div>
                <div className='flex gap-4 mb-5'>
                    <Button type='primary'>Maxsulot tarixini ko'rish</Button>
                    <Button type='primary'>Maxsulot tayyorlashda qushiladigan mahsulotlar</Button>
                    <Button type='primary'>Maxsulot qo'shish</Button>
                </div>
            </div>
            {/* <p><strong>Nomi:</strong> {tayyor1.nomi}</p>
            <p><strong>Miqdori:</strong> {tayyor1.miqdori}</p> */}
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    )
}

export default Tayyor1