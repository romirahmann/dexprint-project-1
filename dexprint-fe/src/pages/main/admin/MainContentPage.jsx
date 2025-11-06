import ClientSection from "../../../components/main/admin/konten/ClientSection";
import HeroSectionManager from "../../../components/main/admin/konten/HeroSection";
import ReviewSection from "../../../components/main/admin/konten/ReviewSection";

export default function MainContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-8">
      <div className="max-w-full mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Landing Page Content
            </h1>
            <p className="text-gray-500 text-sm">
              Edit hero section, customer reviews, and brand partners
            </p>
          </div>
        </div>

        {/* Section */}
        <HeroSectionManager />
        <ReviewSection />
        <ClientSection />
      </div>
    </div>
  );
}
