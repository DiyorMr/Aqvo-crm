import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate , NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import { ColumnsDetailed } from "./constants";

const MagazineTable = () => {
  const [stores, setStores] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [store, setStore] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { RangePicker } = DatePicker;

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const storeData = store?.filter((item) => item.id === id);
  console.log(storeData);

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
          ? await axios.patch(
              `https://aqvo.limsa.uz/api/stores/${selected}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json", // JSON formatda yuborish
                },
              }
            )
          : await axios.post("https://aqvo.limsa.uz/api/stores", data, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // JSON formatda yuborish
              },
            });
      }

      {
        selected
          ? toast.success("Do‘kon muvaffaqiyatli yangilandi!")
          : toast.success("Do‘kon muvaffaqiyatli qo‘shildi!");
      }
      closeModal(); // Modalni yopamiz
      getHistoryItem(); // Yangilangan ma'lumotlarni olib kelamiz
    } catch (error) {
      toast.error("Xatolik yuz berdi: " + error.message);
    }
  };

  const getHistoryItem = async () => {
    const token = localStorage.getItem("accToken");
    try {
      const res = await axios.get(
        "https://aqvo.limsa.uz/api/store-item-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res1 = await axios.get("https://aqvo.limsa.uz/api/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStore(res1?.data?.data);

      setStores(res?.data?.data?.items);
      setFilterData(res?.data?.data?.items);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getHistoryItem();
  }, []);

  return (
    <>
      <div className="overflow-x-scroll lg:overflow-auto">
        <div className="flex justify-between mb-[20px]">
          <NavLink to={"/shops"}>Qaytish</NavLink>
          <RangePicker onChange={onChange} />
        </div>
        <div className="flex items-center justify-between mb-[100px]">
          <div className="flex flex-col gap-[6px]">
            <h1 className="text-[16px]">
              Tashkilot nomi: <span className="font-normal">{storeData?.[0]?.name}</span>
            </h1>
            <h1 className="text-[16px]">
              Tashkilot manzili: <span className="font-normal">{storeData?.[0]?.address}</span>
            </h1>
            <h1 className="text-[16px]">
              Tashkilot telefoni: <span className="font-normal">{storeData?.[0]?.phone}</span>
            </h1>
          </div>
          <div className="flex flex-col gap-[6px] mr-[190px]">
            <h1 className="text-[16px] text-gray-500">Jami: 0</h1>
            <h1 className="text-[16px] text-gray-500">To'langan: 0</h1>
            <h1 className="text-[16px] text-gray-500">Qarzdorligi: 0</h1>
          </div>
        </div>
        <div className="flex mb-[20px] gap-[30px] items-center justify-between">
          <h1 className="text-[24px]">Yetkazilgan mahsulotlar</h1>
          <div className="flex gap-[10px]">
            <NavLink className="w-[200px] px-[5px] py-[10px]   flex items-center justify-center" style={{color:"white" , background:"#1677FF" , borderRadius:"8px"}}>Mahsulot tarixini ko'rish</NavLink>
            <button className="w-[200px] px-[5px] py-[10px]  text-white flex items-center justify-center" style={{color:"white" , background:"#1677FF" , borderRadius:"8px"}}>Mahsulot qo'shish</button>
          </div>
        </div>
        <Table
          dataSource={stores || []}
          columns={ColumnsDetailed}
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
              <button className="py-[6px] px-[15px] rounded-[4px] bg-blue-500 text-white font-[500] cursor-pointer">
                {selected ? "O'zgarishni saqlash" : "Do'kon qo'shish"}
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
