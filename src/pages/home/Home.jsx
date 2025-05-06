import  { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { TbBucket } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import propertyService from "../../services/propertyService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Home = () => {
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
      const response = await propertyService.getAllProperties();
      setProperties(response);
      console.log(response, 'response');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleDeleteProperty = (id) => {
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
          await propertyService.deleteProperty(id);
          toast.success("Property deleted successfully");
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
      <button
        onClick={() => navigate('/add-property')}
        className="bg-blue-500 text-white font-semibold mb-4 ml-auto w-fit flex py-2 px-4 cursor-pointer rounded-md shadow-md hover:bg-blue-600 transition-all"
      >
        Add Property
      </button>

      <div className="overflow-x-auto rounded-2xl p-4 shadow">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              <th className="p-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => setSelectedRows(selectedRows.length === properties.length ? [] : properties.map(item => item._id))}
                  checked={selectedRows.length === properties.length}
                />
              </th>
              <th className="p-4">Property Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => (
              <tr key={item._id} className={`border-b ${selectedRows.includes(item._id) ? 'bg-gray-200' : ''}`}>
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedRows.includes(item._id)}
                    onChange={() => handleRowSelection(item._id)}
                  />
                </td>
                <td className="p-4">{item.propertyName}</td>
                <td className="p-4">{item.location}</td>
                <td className="p-4">${item.price}</td>
                <td className="p-4">
                  <span className={`py-1 px-3 rounded-full text-white ${item.currentStatus === 'Available' ? 'bg-green-500' : 'bg-blue-500'}`}>
                    {item.currentStatus}
                  </span>
                </td>
                <td className="p-4">
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="p-4 space-x-2">
                  {/* <button className="bg-blue-500 text-white p-2 rounded-full cursor-pointer"><FaEye /></button> */}
                  <button onClick={() => navigate(`/edit-property/${item._id}`)} className="bg-green-500 text-white p-2 rounded-full cursor-pointer"><FaEdit /></button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-full cursor-pointer"
                    onClick={() => handleDeleteProperty(item._id)}
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

export default Home;
