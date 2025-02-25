import { Button, DatePicker } from "antd";
import React from "react";
import AttendanceTable from "./AttendanceTable";

const Attendance = () => {
  const { RangePicker } = DatePicker;
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-semibold text-2xl ">Hodimlar</h1>
        <div className="flex items-center gap-4">
          <RangePicker />
          <Button type="primary">Yangilash</Button>
        </div>
      </div>
      <AttendanceTable />
    </div>
  );
};

export default Attendance;
