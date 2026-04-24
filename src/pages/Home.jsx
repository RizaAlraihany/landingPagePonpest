import Hero from "../sections/Hero";
import Profile from "../sections/Profile";
import Programs from "../sections/Programs";
import DailySchedule from "../sections/DailySchedule";
import RegistrationFlow from "../sections/RegistrationFlow";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Profile />
      <Programs />
      <DailySchedule />
      <RegistrationFlow />
      <Contact />
    </>
  );
}
