import React, { useEffect, useState } from "react";
import { useAppointmentStore } from "../store/appointment.store";
import Spinner from '../components/Spinner';

const DoctorDashboard = () => {
  const {
    appointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    loading,
    err,
  } = useAppointmentStore();
  const [tab, setTab] = useState('current');

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
    } catch (error) {
      console.log("Failed to update status:", error);
    }
  };

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const accepted = appointments.filter(a => a.status === 'accepted').length;
  const completed = appointments.filter(a => a.status === 'completed').length;

  const currentAppointments = appointments.filter(a => a.status === 'pending' || a.status === 'accepted');
  const pastAppointments = appointments.filter(a => a.status === 'completed');

  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-stretch bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-8 px-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 justify-between min-h-[32rem]">
          <div>
            <h2 className="text-2xl font-extrabold text-blue-700 mb-4 text-center">Doctor Dashboard</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-blue-700">{total}</span>
                <span className="text-gray-700 font-semibold">Total Appointments</span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-yellow-600">{pending}</span>
                <span className="text-gray-700 font-semibold">Pending</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-green-700">{accepted}</span>
                <span className="text-gray-700 font-semibold">Accepted</span>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-700">{completed}</span>
                <span className="text-gray-700 font-semibold">Completed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-8">
          <div className="flex gap-4 mb-4">
            <button
              className={`px-6 py-2 rounded-t-lg font-bold text-lg transition-colors duration-200 focus:outline-none ${tab === 'current' ? 'bg-blue-500 text-white shadow' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
              onClick={() => setTab('current')}
            >
              Current Appointments
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg font-bold text-lg transition-colors duration-200 focus:outline-none ${tab === 'past' ? 'bg-green-500 text-white shadow' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              onClick={() => setTab('past')}
            >
              Past Appointments
            </button>
          </div>
          {loading && <Spinner className="my-8" />}
          {err && <p className="text-red-500 text-center font-semibold mt-2">{err}</p>}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(tab === 'current' ? currentAppointments : pastAppointments).length === 0 ? (
                <p className="text-gray-500 text-center text-lg col-span-2">No {tab === 'current' ? 'current' : 'past'} appointments</p>
              ) : (
                (tab === 'current' ? currentAppointments : pastAppointments).map((appt) => (
                  <div key={appt._id} className="bg-green-50 border border-green-200 rounded-xl p-6 shadow flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-green-700 mb-1">Patient: <span className="text-gray-800">{appt.patientId?.name}</span></h3>
                    <p className="text-gray-700"><span className="font-semibold">Email:</span> {appt.patientId?.email}</p>
                    <p className="text-gray-700"><span className="font-semibold">Time:</span> {appt.time}</p>
                    <p className="text-gray-700"><span className="font-semibold">Status:</span> <span className="font-bold">{appt.status}</span></p>
                    {appt.documentUrl && (
                      <div className="mt-2">
                        <span className="font-semibold text-gray-700">Attachment: </span>
                        {/(\.pdf($|\?))/i.test(appt.documentUrl) || appt.documentUrl.includes('/raw/upload/') ? (
                          <a
                            href={appt.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View PDF
                          </a>
                        ) : (
                          <a
                            href={appt.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Picture
                          </a>
                        )}
                      </div>
                    )}
                    {appt.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleStatusUpdate(appt._id, "accepted")}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-colors duration-200">
                          Accept
                        </button>
                        <button onClick={() => handleStatusUpdate(appt._id, "cancelled")}
                          className="flex-1 px-4 py-2 rounded-lg bg-red-400 hover:bg-red-500 text-white font-semibold shadow transition-colors duration-200">
                          Reject
                        </button>
                      </div>
                    )}
                    {appt.status === "accepted" && (
                      <button onClick={() => handleStatusUpdate(appt._id, "completed")}
                        className="w-full px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-colors duration-200 mt-2">
                        Mark as Completed
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
