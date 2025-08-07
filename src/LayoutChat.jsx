import SideBar from "./components/layout/SideBar";
import { Outlet } from "react-router";
export default function LayoutChat() {
  return (
    <div className="h-screen flex gap-4 overflow-hidden">
      <SideBar className={"h-[90%]"} />

      <main className="flex-1 overflow-auto h-[90%] my-auto pr-4">
        <Outlet />
      </main>
    </div>
  );
}
