import { notFound } from "next/navigation";

export default function ShopCatchAll() {
  // Aquí decides si existe algo. Si no, dispara el 404 local:
  notFound();
}