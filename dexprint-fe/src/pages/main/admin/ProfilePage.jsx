/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CompanyProfileInfo from "../../../components/main/admin/Profile/CompanyProfileInfo";

import api from "../../../services/axios.service";

export default function ProfilePage() {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let res = await api.get("/master/profile");
        setProfile(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 py-2 px-4 sm:px-8">
      <div
        className="max-w-full
       mx-auto "
      >
        {/* Profile Info */}
        <CompanyProfileInfo profile={profile} />
      </div>
    </div>
  );
}
