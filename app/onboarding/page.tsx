import { redirect } from "next/navigation";

export default function OnboardingPage() {
  redirect("/legacy/index.html?questionario=1");
}
