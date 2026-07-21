import HomePage from "./components/home/HomePage";

export default function Page() {
  return <HomePage />;
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products");
}
