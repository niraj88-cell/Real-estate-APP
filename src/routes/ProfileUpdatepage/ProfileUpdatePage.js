import { useContext, useState } from "react";
import "./ProfileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../components/Lib/apiRequest.js";
import UploadWidget from "../../components/UploadWidget/UploadWidget.js";


function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const navigate = useNavigate();
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formdata = new FormData(e.target);
    const {username,email,password,avatar}=Object.fromEntries(formdata);


    try{

        const res=await apiRequest.put(`/users/${currentUser.id}`,{username,email,password,avatar})
        updateUser(res.data);
        navigate("/profilepage");

    }catch(err){
        console.log(err)

    }
  }





  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
       <UploadWidget uwConfig={{
        cloudName:"dyavl8sai",
        uploadPreset:"estate",
        multiple:false,
        maxImageFileSize:2000000,
        folder:"avatars",
       }}
       setState={setAvatar}
       />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;