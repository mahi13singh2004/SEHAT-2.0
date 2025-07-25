import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useAppointmentStore = create((set) => ({
  recommendedDoctor: null,
  manualDoctors: [],
  selectedDoctor: null,
  loading: false,
  err: null,
  selectedTime: null,
  appointments: [],

  setRecommendedDoctors: (doctor) => set({ recommendedDoctor: doctor }),
  setManualDoctors: (doctors) => set({ manualDoctors: doctors }),
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setSelectedTime: (time) => set({ selectedTime: time }),

  fetchRecommendedDoctor: async (description) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        "https://sehat-2-0-backend.onrender.com/api/ai/recommendDoctor",
        { description }
      );
      set({ recommendedDoctor: res.data.doctor });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Unable to recommend doctor",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchManualDoctors: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("https://sehat-2-0-backend.onrender.com/api/list/doctors");
      set({ manualDoctors: res.data.doctors });
    } catch (error) {
      set({ err: error.response?.data?.message || "Unable to get doctors" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  confirmAppointment: async (documentUrl) => {
    const { selectedDoctor, selectedTime } = useAppointmentStore.getState();
    try {
      set({ loading: true });
      await axios.post("https://sehat-2-0-backend.onrender.com/api/appointment", {
        doctorId: selectedDoctor._id,
        time: selectedTime,
        documentUrl: documentUrl || null,
      });
      set({ selectedDoctor: null, selectedTime: null });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Unable to confirm appointment",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchAppointments: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(
        "https://sehat-2-0-backend.onrender.com/api/appointment/patient"
      );
      set({ appointments: res.data.appointments });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Unable to get appointments",
      });
    } finally {
      set({ loading: false });
    }
  },

  getDoctorAppointments: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(
        "https://sehat-2-0-backend.onrender.com/api/appointment/doctor"
      );
      set({ appointments: res.data.appointments });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Unable to get appointments",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      set({ loading: true });
      await axios.put(`https://sehat-2-0-backend.onrender.com/api/appointment/update/${id}`, {
        status,
      });
      const res = await axios.get(
        "https://sehat-2-0-backend.onrender.com/api/appointment/doctor"
      );
      set({ appointments: res.data.appointments });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Unable to get appointments",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
