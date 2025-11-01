import CompanyProfileInfo from "./CompanyProfileInfo";
import CompanyService from "./CompanyService";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 py-2 px-4 sm:px-8">
      <div
        className="max-w-full
       mx-auto "
      >
        {/* Profile Info */}
        <CompanyProfileInfo />

        {/* Services */}
        <CompanyService />
      </div>
    </div>
  );
}
