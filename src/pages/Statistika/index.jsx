import { BarChartOutlined, DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axios from "../../axios";

const { Option } = Select;

const Statistika = () => {
  const [analytics, setAnalytics] = useState({ totalProduced: 0, totalProfit: 0, totalSold: 0 });
  const [conserveType, setConserveType] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [conserveTypes, setConserveTypes] = useState([]);
  const [chartData, setChartData] = useState({
    resultObject: {},
    totalExpenditure: 0
  });

  // Transform the resultObject into an array format for Recharts
  const transformChartData = () => {
    if (!chartData.resultObject) return [];
    
    return Object.entries(chartData.resultObject).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Transform data for the table
  const getTableData = () => {
    if (!chartData.resultObject) return [];
    
    return Object.entries(chartData.resultObject).map(([name, value]) => ({
      key: name,
      name,
      amount: value
    }));
  };

  // Table columns
  const columns = [
    {
      title: 'Resurs Nomi',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
    },
    {
      title: 'Miqdori (kg)',
      dataIndex: 'amount',
      key: 'amount',
      width: '50%',
    },
  ];

  // Fetch analytics data using Axios
  useEffect(() => {
    axios.get("/analytics")
      .then(({ data }) => setAnalytics(data))
      .catch(() => message.error("Failed to load analytics"));
    
    axios.get('/conserve-type')
      .then(({ data }) => setConserveTypes(data.data))
      .catch(() => message.error("Failed to load conserve types"));
  }, []);

  // Handle form submission with Axios
  const handleSubmit = async () => {
    if (!conserveType || !amount) {
      message.warning("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/analytics/type?typeId=${conserveType}&count=${amount}`);
      setChartData(response.data.data);
      message.success("Ma'lumotlar muvaffaqiyatli yuklandi!");
      setConserveType("");
      setAmount("");
    } catch (error) {
      message.error("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const handleConserveTypeChange = (value) => {
    setConserveType(value);
  };

  // Format the currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('uz-UZ').format(value) + " so'm";
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Analytics Cards */}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Ishlab Chiqirilgan" extra={<BarChartOutlined style={{ color: "gold" }} />}>
            <h2>{analytics.totalProduced}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Sotilgan" extra={<ShoppingCartOutlined style={{ color: "blue" }} />}>
            <h2>{analytics.totalSold}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Umumiy Tushum" extra={<DollarOutlined style={{ color: "green" }} />}>
            <h2>{analytics.totalProfit} so'm</h2>
          </Card>
        </Col>
      </Row>

      {/* Resource Form */}
      <Card title="Resurs Hisoboti" style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Mahsulotni tanlang</label>
          <Select 
            value={conserveType} 
            onChange={handleConserveTypeChange} 
            style={{ width: "100%", marginTop: "5px" }}
          >
            {conserveTypes.map(item => (
              <Option key={item.id} value={item.id}>{item.conserveType}</Option>
            ))}
          </Select>
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Mahsulot miqdorini kiriting</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Miqdorni kiriting"
            style={{ marginTop: "5px" }}
          />
        </div>

        <Button type="primary" loading={loading} onClick={handleSubmit} block>
          Tasdiqlash
        </Button>
      </Card>

      {/* Chart and Expenditure Section */}
      {chartData.totalExpenditure > 0 && (
        <div style={{ marginTop: "20px", background: "#f7f7f7", padding: "20px" }}>
          {/* Chart */}
          <div style={{ width: "100%", height: "300px", background: "white", marginBottom: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transformChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} kg`, "Miqdor"]} />
                <Bar dataKey="value" fill="#7EDECD" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Table Title */}
          <h2 style={{ margin: "30px 0 20px 0" }}>Sarflangan resurslar jadvali:</h2>
          
          {/* Table */}
          <Table 
            columns={columns} 
            dataSource={getTableData()} 
            pagination={false} 
            bordered
          />
          
          {/* Total Amount */}
          <div style={{ margin: "20px 0", fontSize: "16px", fontWeight: "bold" }}>
            Umumiy chiqim: {formatCurrency(chartData.totalExpenditure)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistika;