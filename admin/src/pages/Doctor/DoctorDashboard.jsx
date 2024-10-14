import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData,cancelAppointment,completeAppointment } =useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-2xl font-medium bg-primary text-white px-6 py-3 w-full  rounded">
          Dashboard
        </p>

        <div className="flex flex-wrap gap-3 m-2 justify-between">
          <div className="flex items-center gap-2 bg-white p-4 min-w-80 px-16 py-5 rounded border-2 border-gray-100 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl px-4 font-semibold text-gray-700">
                {currency} {dashData.earnings}
              </p>
              <p className="px-4 text-gray-500">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-80 px-16 py-5 rounded border-2 border-gray-100 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl px-4 font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="px-4 text-gray-500">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-80 px-16 py-5 rounded border-2 border-gray-100 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold px-4 text-gray-700">
                {dashData.patients}
              </p>
              <p className="px-4 text-gray-500">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border ">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>
          <div className="pt-4 border border-t-0 ">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 font-medium text-xs">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500  font-medium text-xs">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      className="w-10 cursor-pointer"
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      className="w-10 cursor-pointer"
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
