"use client";

import { use } from "react";
import ClassicTemplate from "@/components/templates/renderers/classic";

export default function LiveInvitationPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // Dummy data simulating fetching from database based on the 'slug'
  const liveData = {
    groom: "Iqbal",
    bride: "Pasangan",
    eventDate: "2027-01-01T09:00",
    locationName: "Hotel Grand Invitea",
    locationAddress: "Kawasan Elit Sudirman, Jakarta"
  };

  return (
    // Live mode takes up the full browser screen naturally. 
    // The ClassicTemplate component is already designed to be max-w-md mx-auto.
    <div className="min-h-screen bg-stone-900">
      <ClassicTemplate data={liveData} isPreview={false} />
    </div>
  );
}
