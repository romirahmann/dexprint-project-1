import CompanyProfileInfo from "./CompanyProfileInfo";


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Company Profile
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your company information
            </p>
          </div>
          <div className="w-16 h-16 bg-orange-500 text-white flex items-center justify-center rounded-2xl text-2xl font-bold shadow-md">
            D
          </div>
        </div>

        {/* Profile Info */}
        <CompanyProfileInfo />

        {/* Services */}
        <CompanyServices />
      </div>
    </div>
  );
}
