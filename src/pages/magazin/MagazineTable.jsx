import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Columns } from "./constants";

const MagazineTable = () => {
  const [stores, setStores] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [name , setName] = useState("");
  const [address , setAddress] = useState("")
  const [phone , setPhone] = useState(null);
  const [selected , setSelected] = useState(null)
  
  const openModal = () => {
    setChangeModal(true);
  };

  const closeModal = () => {
    setChangeModal(false);
    setSelected(null);
      setSelected("");
      setName("");
      setAddress("");
      setPhone("");
  };


 const EditData = (store) => {
  setSelected(store?.id)
  setName(store?.name)
  setAddress(store?.address)
  setPhone(store?.phone)
  openModal()
 }


const Submit = async (e) => {
  e.preventDefault(); // Sahifa qayta yuklanishini oldini olamiz

  try {
    const token = localStorage.getItem("accToken");

    const data = {
      name,
      address,
      phone,
    };

    {
      selected
        ? await axios.patch(`https://aqvo.limsa.uz/api/stores/${selected}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // JSON formatda yuborish
            },
          })
        : await axios.post("https://aqvo.limsa.uz/api/stores", data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // JSON formatda yuborish
            },
          });
    }

    {selected
      ? toast.success("Do‘kon muvaffaqiyatli yangilandi!")
      : toast.success("Do‘kon muvaffaqiyatli qo‘shildi!")}
    closeModal() // Modalni yopamiz
    getMagazine(); // Yangilangan ma'lumotlarni olib kelamiz
  } catch (error) {
    toast.error("Xatolik yuz berdi: " + error.message);
  }
};


  const getMagazine = async () => {
    const token = localStorage.getItem("accToken");
    try {
      const res = await axios.get("https://aqvo.limsa.uz/api/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStores(res?.data?.data);
      setFilterData(res?.data?.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value === "") {
      setFilterData(stores);
    } else {
      const filtered = stores.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(filtered);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accToken");
    await axios.delete(`https://aqvo.limsa.uz/api/stores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getMagazine();
  };


  useEffect(() => {
    getMagazine();
  }, []);

  return (
    <>
      <div className="overflow-x-scroll lg:overflow-auto">
        <div className="flex items-center gap-[30px] justify-between mb-[20px]">
          <h1>Do'kanlar: {filterData?.length}</h1>
          <div className="flex items-center gap-[20px]">
            <div className="w-[200px]  flex items-center">
              <input
                className="w-[80%] border border-gray-400 border-r-0 outline-none  p-[5px] rounded-l-[4px]"
                placeholder="Do'konlar"
                type="text"
                onChange={(e) => handleSearch(e?.target?.value)}
              />
              <button className="w-[20%] cursor-pointer p-[5px] rounded-r-[4px] border border-blue-500 bg-blue-500">
                <SearchOutlined style={{ color: "white" }} />
              </button>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-blue-500   min-w-[150px] text-white p-[6px] rounded-[8px] cursor-pointer"
            >
              "Do'kon qo'shish"
            </button>
          </div>
        </div>
        <hr />
        <br />
        <Table
          bordered
          dataSource={filterData}
          columns={Columns({ handleDelete  ,  EditData  })}
          rowKey="id"
        />
      </div>
      {changeModal ? (
        <div
          onClick={() => {
            closeModal();
          }}
          className="fixed top-0 left-0 flex items-center flex-col justify-center w-full h-full form-div"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={Submit}
            action=""
            className="bg-white relative  max-w-[500px] gap-3 p-[30px] rounded-[10px] w-full z-[1000] flex items-center justify-center flex-col"
          >
            <h1 className="font-bold text-[24px]">Do'kon qo'shish</h1>
            <div className="flex flex-col gap-0.5 max-w-[400px] w-full">
              <label className="font-[500]" htmlFor="name">
                Do'kon nomi
              </label>
              <input
                onChange={(e) => setName(e?.target?.value)}
                value={name}
                required
                id="name"
                type="text"
                className="border border-gray-300 rounded-[6px] p-[5px] outline-none "
                placeholder="Do`kon nomi"
              />
            </div>
            <div className="flex flex-col gap-0.5 max-w-[400px] w-full">
              <label className="font-[500]" htmlFor="address">
                Do'kon manzili
              </label>
              <input
                onChange={(e) => setAddress(e?.target?.value)}
                required
                value={address}
                id="address"
                type="text"
                className="border border-gray-300 rounded-[6px] p-[5px] outline-none "
                placeholder="Do`kon manzili"
              />
            </div>
            <div className="flex flex-col gap-0.5 max-w-[400px] w-full">
              <label className="font-[500]" htmlFor="phone">
                Telfon raqami
              </label>
              <input
                onChange={(e) => setPhone(e?.target?.value)}
                required
                value={phone}
                id="phone"
                type="text"
                className="border border-gray-300 rounded-[6px] p-[5px] outline-none "
                placeholder="Telefon raqami"
              />
            </div>
            <div className="flex items-center justify-end w-full mr-[40px]">
              <button  className="py-[6px] px-[15px] rounded-[4px] bg-blue-500 text-white font-[500] cursor-pointer">
                {selected ? "O'zgarishni saqlash"  : "Do'kon qo'shish"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MagazineTable;
