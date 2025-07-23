import React, { useEffect, useState } from 'react'
import { useAppointmentStore } from '../store/appointment.store.js'
import Spinner from '../components/Spinner'
import { FaCheckCircle, FaHourglassHalf, FaClipboardCheck } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'

const PatientDashboard = () => {
  const { appointments, loading, err, fetchAppointments } = useAppointmentStore()
  const [tab, setTab] = useState('current')
  const [ratingState, setRatingState] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const accepted = appointments.filter(a => a.status === 'accepted').length;
  const completed = appointments.filter(a => a.status === 'completed').length;

  const getCardStyle = (status) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          badge: 'bg-yellow-400 text-yellow-900',
          icon: <FaHourglassHalf className="text-yellow-500 text-2xl mr-2" />
        };
      case 'accepted':
        return {
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-400 text-blue-900',
          icon: <FaClipboardCheck className="text-blue-500 text-2xl mr-2" />
        };
      case 'completed':
        return {
          bg: 'bg-green-50 border-green-200',
          badge: 'bg-green-400 text-green-900',
          icon: <FaCheckCircle className="text-green-500 text-2xl mr-2" />
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          badge: 'bg-gray-300 text-gray-800',
          icon: null
        };
    }
  };

  const currentAppointments = appointments.filter(a => a.status === 'pending' || a.status === 'accepted');
  const pastAppointments = appointments.filter(a => a.status === 'completed');

  const handleRate = async (appointmentId, rating) => {
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointment/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ appointmentId, rating }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Invalid server response' };
      }
      if (res.ok) {
        setRatingState((prev) => ({ ...prev, [appointmentId]: rating }));
        fetchAppointments();
      } else {
        alert(data.message || 'Failed to rate');
      }
    } catch (e) {
      alert('Failed to rate');
      console.log(e)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-stretch bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-8 px-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 justify-between min-h-[32rem]">
          <div>
            <h2 className="text-2xl font-extrabold text-blue-700 mb-4 text-center">Patient Dashboard</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-blue-700">{total}</span>
                <span className="text-gray-700 font-semibold">Total Appointments</span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-yellow-600">{pending}</span>
                <span className="text-gray-700 font-semibold">Pending</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-blue-700">{accepted}</span>
                <span className="text-gray-700 font-semibold">Accepted</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-green-700">{completed}</span>
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
          {err && <p className="text-red-500 text-center font-semibold mt-2">{err}</p>}
          {loading && <Spinner className="my-8" />}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(tab === 'current' ? currentAppointments : pastAppointments).length === 0 ? (
                <p className="text-gray-500 text-center text-lg col-span-2">No {tab === 'current' ? 'current' : 'past'} appointments</p>
              ) : (
                (tab === 'current' ? currentAppointments : pastAppointments).map((appointment) => {
                  const { bg, badge, icon } = getCardStyle(appointment.status);
                  return (
                    <div key={appointment._id} className={`${bg} border rounded-xl p-6 shadow flex flex-col gap-2 relative overflow-hidden`}>
                      <div className="flex items-center mb-2">
                        {icon}
                        <h3 className="text-xl font-bold mr-2">Doctor: <span className="text-gray-800">{appointment.doctorId.name}</span></h3>
                        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badge}`}>{appointment.status}</span>
                      </div>
                      <p className="text-gray-700"><span className="font-semibold">Specialization:</span> {appointment.doctorId.specialization}</p>
                      <p className="text-gray-700"><span className="font-semibold">Time:</span> {appointment.time}</p>
                      <p className="text-gray-700"><span className="font-semibold">Booked At:</span> {new Date(appointment.createdAt).toLocaleString()}</p>
                      {tab === 'past' && (
                        <div className="mt-2">
                          {appointment.rating ? (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-green-700">Rated:</span>
                              {[...Array(appointment.rating)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-400" />
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <span className="font-semibold text-blue-700">Rate your doctor:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`cursor-pointer ${ratingState[appointment._id] >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    onClick={() => setRatingState((prev) => ({ ...prev, [appointment._id]: star }))}
                                  />
                                ))}
                              </div>
                              <button
                                className="mt-1 px-4 py-1 rounded bg-blue-500 text-white font-semibold disabled:opacity-60"
                                disabled={!ratingState[appointment._id] || submitting}
                                onClick={() => handleRate(appointment._id, ratingState[appointment._id])}
                              >
                                {submitting ? 'Submitting...' : 'Submit Rating'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard