import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { TbBucket } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import bookingService from "../../services/bookingService";

const Bookings = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [properties, setProperties] = useState([]);

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getAllProperties = async () => {
    try {
      const response = await bookingService.getAllBookings();
      setProperties(response);
      console.log(response, 'response');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await bookingService?.deleteBooking(id);
          toast.success("Booking deleted successfully");
          getAllProperties(); // Refresh list
        } catch (error) {
          console.error("Error deleting property:", error);
          toast.error("Failed to delete property");
        }
      }
    });
  };


  return (
    <div className="max-w-[1200px] mx-auto p-4 my-10">
      <div className="overflow-x-auto rounded-2xl p-4 shadow">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              <th className="p-4">Booking Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Days</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((item) => (
              <tr key={item?._id} className={`border-b ${selectedRows.includes(item?._id) ? 'bg-gray-200' : ''}`}>
                <td className="p-4">{item?.name}</td>
                <td className="p-4">{item?.propertyLocation}</td>
                <td className="p-4">{item?.days} days</td>
                <td className="p-4">
                  {item?.email}
                </td>
                <td className="p-4">
                  {item?.phone}
                </td>
                <td className="p-4">
                  {new Date(item?.date).toLocaleDateString("en-GB")}
                </td>
                <td className="p-4 space-x-2">
                  <button
                    className="bg-red-500 text-white p-2 rounded-full cursor-pointer"
                    onClick={() => handleDeleteBooking(item._id)}
                  >
                    <TbBucket />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {properties.length === 0 && (
          <p className="text-center text-gray-500 py-4">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
