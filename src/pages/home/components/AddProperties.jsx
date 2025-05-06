import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the close icon
import Select from "react-select";
import './style.css'
import { useNavigate, useParams } from "react-router-dom";
import propertyService from "../../../services/propertyService";
import toast from "react-hot-toast";
import { uploadImg } from "../../../services/image";

const AddProperties = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: '',
    price: '',
    location: '',
    city: '',
    currentStatus: 'Available',
    squareFeet: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpace: 'Available',
    propertyDetail: '',
    images: [] // Store selected images here
  });

  const propertyTags = [
    { value: "Backyard", label: "Backyard" },
    { value: "Pet Friendly", label: "Pet Friendly" },
    { value: "Balcony", label: "Balcony" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Garage", label: "Garage" },
    { value: "Laundry", label: "Laundry" },
    { value: "Fitness Center", label: "Fitness Center" },
    { value: "Studio", label: "Studio" },
    { value: "Outdoor Kitchen", label: "Outdoor Kitchen" },
    { value: "Family Room", label: "Family Room" },
    { value: "Barbeque", label: "Barbeque" },
    { value: "Soccer Field", label: "Soccer Field" },
    { value: "Storage Units", label: "Storage Units" },
    { value: "Wi-fi", label: "Wi-fi" },
    { value: "Sauna", label: "Sauna" },
    { value: "Gym", label: "Gym" }
  ];

  // ✅ Step 2: Fetch property data by ID
  useEffect(() => {
    if (id) {
      propertyService.getPropertyById(id)
        .then((res) => {
          setFormData(res);
          setPreviewImages(res.images || []);
        })
        .catch((err) => {
          console.error('Failed to fetch property', err);
          toast.error('Failed to load property data');
        });
    }
  }, [id]);
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);

    for (const file of files) {
      const form = new FormData();
      form.append("images", file);

      try {
        const res = await uploadImg(form);
        console.log(res)
        if (res?.success) {
          uploadedUrls.push(...res.urls);
          console.log(uploadedUrls, 'uploadedUrls')
          toast.success('Image upload Successfully')
        } else {
          toast.error("Failed to upload one or more images");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Error uploading image");
      }
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
  };


  // Handle removing an image
  const handleRemoveImage = (index) => {
    // Remove preview image
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    // Remove corresponding uploaded image URL
    const updatedImageUrls = formData.images.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviews);
    setFormData((prev) => ({
      ...prev,
      images: updatedImageUrls,
    }));
  };

  // Handle selecting multiple property tags
  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      tags: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const updated = await propertyService.updateProperty(id, formData);
        if (updated) {
          toast.success("Property updated successfully");
          navigate("/home");
        }
      } else {
        const newProperty = await propertyService.createProperty(formData);
        if (newProperty) {
          toast.success("Property added successfully");
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      toast.error("Submission failed");
    }
  };
  

  return (
    <div className="property-form-container">

      <button
        onClick={() => navigate(-1)} // Correctly handle the click
        className="bg-blue-500 text-white font-semibold mb-4  py-2 px-4 rounded-md shadow-md cursor-pointer hover:bg-blue-600 transition-all"
      >
        Go Back
      </button>

      <div className="upload-section">
        <label htmlFor="fileUpload" className="upload-box">
          <p>Property Image</p>
          <div className="upload-inner">
            <input
              type="file"
              id="fileUpload"
              hidden
              multiple
              onChange={handleFileChange}
            />
            <button type="button" className="upload-btn">Add File</button>
            <p>Or drag and drop files</p>
          </div>

          {/* Display selected images in the box */}
          {previewImages.length > 0 && (
            <div className="image-previews">
              {previewImages.map((image, index) => (
                <div key={index} className="image-preview-box">
                  <img src={image} alt={`preview-${index}`} className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </label>
      </div>

      <form className="property-form shadow rounded-3xl" onSubmit={handleSubmit}>
        <h3>Property Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Property Name</label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              placeholder="Enter property name"
            />
          </div>
          <div className="form-group">
            <label>Property Type</label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              defaultValue="Villa"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>

          <div className="form-group">
            <label>Current Status</label>
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleInputChange}
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Under Contract">Under Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Square Feet</label>
            <input
              type="text"
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleInputChange}
              defaultValue="360 feet"
            />
          </div>
          <div className="form-group">
            <label>Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              defaultValue="4"
            />
          </div>
          <div className="form-group">
            <label>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              defaultValue="2"
            />
          </div>

          <div className="form-group">
            <label>Parking Space</label>
            <select
              name="parkingSpace"
              value={formData.parkingSpace}
              onChange={handleInputChange}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>


          <div className="form-group full-width">
            <label>Property Tags</label>
            <Select
              isMulti
              name="tags"
              options={propertyTags}
              className="react-select-container w-full"
              classNamePrefix="react-select"
              onChange={handleSelectChange}
              value={propertyTags.filter(tag => formData?.tags?.includes(tag.value))}
              placeholder="Select property tags"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Property Detail</label>
          <textarea
            name="propertyDetail"
            value={formData.propertyDetail}
            onChange={handleInputChange}
            placeholder="Enter detail..."
            rows="4"
          ></textarea>
        </div>



        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddProperties;
