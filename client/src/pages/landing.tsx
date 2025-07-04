import Hero from "@/components/landing/hero";
import Education from "@/components/landing/education";
import UserTypeSelection from "@/components/landing/user-type-selection";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Education />
      <UserTypeSelection />
    </div>
  );
}
