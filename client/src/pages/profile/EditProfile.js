import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./EditProfile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async e => {
  e.preventDefault ();
  setIsLoading (true);
  try {
    // Handle Image upload
    let imageURL;
    if (
      profileImage &&
      (profileImage.type === 'image/jpeg' ||
        profileImage.type === 'image/jpg' ||
        profileImage.type === 'image/png')
    ) {
      const image = new FormData ();
      image.append ('file', profileImage);
      image.append ('cloud_name', 'dsvfcvz3t');
      image.append ('upload_preset', 'pysqrpak');

      // First save image to cloudinary
      const response = await fetch (
        'https://api.cloudinary.com/v1_1/dsvfcvz3t/image/upload',
        {method: 'post', body: image}
      );

      const imgData = await response.json ();
      if (imgData.error) {
        throw new Error (imgData.error.message);
      }
      imageURL = imgData.secure_url;

      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      const data = await updateUser(formData);
      console.log(data)
      toast.success ('User updated');
      navigate ('/profile');
      setIsLoading (false);
    }
  } catch (error) {
    console.log (error);
    setIsLoading (false);
    toast.error (error.message);
  }
};


  return (
 <div className="user-profile --margin-y2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-picture">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --margin" onSubmit={saveProfile}>
          <span className="profile-details">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
    <label>Photo:</label>
<div className="custom-file-upload">
  <span>Select file</span>
  <input type="file" name="image" onChange={handleImageChange} />
</div>

            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword  />
    </div>
  );
};

export default EditProfile;