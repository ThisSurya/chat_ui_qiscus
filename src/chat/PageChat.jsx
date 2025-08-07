import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Search,
  Send,
  Paperclip,
  Smile,
  ChevronRight,
  Folder,
  Link,
  EllipsisVertical,
  File,
  Image,
  FilePlay,
  Files,
  ListFilterPlus,
  Users, // Mengganti Participant untuk konsistensi
  X,
  FolderOpen,
  UsersRound, // Ikon untuk menutup sidebar
} from "lucide-react";
import ButtonPrimary from "../components/button/ButtonPrimary";
import { useChatData } from "../services/FetchChat";
import ChatMessages from "../components/ui/ChatMessages";
import FileTypeItem from "../components/ui/FileTypeItem";

const fileTypes = [
  {
    id: 1,
    icon: File,
    title: "Documents",
    fileCount: 126,
    size: "200Mb",
  },
  {
    id: 2,
    icon: Image,
    title: "Photos",
    fileCount: 53,
    size: "321Mb",
  },
  {
    id: 3,
    icon: FilePlay,
    title: "Video",
    fileCount: 2,
    size: "152Mb",
  },
  {
    id: 4,
    icon: Files,
    title: "Other",
    fileCount: 49,
    size: "99Mb",
  },
];

export default function PageChat() {
  const { chatData, loading, error } = useChatData();
  // State untuk mengontrol tampilan di mobile: 'list', 'chat', atau 'files'
  const [mobileView, setMobileView] = useState("list");

  return (
    // Kontainer utama untuk layout
    <div className="flex h-full gap-4 relative">
      <div
        className={`
          ${mobileView === "list" ? "flex" : "hidden md:flex"}
          flex-col gap-6 max-w-xs w-full
          absolute md:relative inset-0 lg:inset-auto z-20 lg:z-auto bg-blue-bg lg:bg-transparent
        `}
      >
        <div className="flex gap-3 items-center border-b-[3px] border-blue-1 pb-6">
          <h1 className="text-xl font-semibold">React Chat</h1>
          <ButtonPrimary className="ml-auto">
            <Plus className="stroke-blue-3/50" size={16} />
          </ButtonPrimary>
        </div>

        <div className="bg-blue-1/50 focus-within:bg-blue-1/70 hover:bg-blue-1/70 rounded-xl flex items-center px-4 py-2">
          <input
            type="text"
            placeholder="Find Messages"
            className="w-full border-none rounded-lg p-1 placeholder-blue-3/70 focus:outline-none bg-transparent"
          />
          <Search className="stroke-blue-2/50" />
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-cream">Last chat</h3>
          <ListFilterPlus className="stroke-blue-3 cursor-pointer" size={18} />
        </div>

        {/* Item Chat */}
        <div
          className="flex items-center gap-4 hover:bg-blue-1/50 rounded-xl p-3 cursor-pointer"
          onClick={() => setMobileView("chat")} // Pindah ke tampilan chat saat diklik
        >
          <img
            src={
              chatData?.room?.image_url ||
              "https://picsum.photos/id/237/200/300"
            }
            className="w-10 h-10 rounded-full object-cover"
            alt={chatData?.room?.name || "Chat"}
          />
          <div className="space-y-1 text-xs flex-1 min-w-0">
            <div className="flex items-center">
              <h2 className="text-semibold text-sm truncate mr-auto">
                {chatData?.room?.name || "Group Chat"}
              </h2>
              <p className="text-xss">11:50</p>
            </div>
            <p className="truncate text-xss text-blue-3">
              {chatData?.comments?.[chatData.comments.length - 1]?.message ||
                "No messages yet"}
            </p>
          </div>
        </div>
      </div>

      {/* Sesi chat (Konten Utama) */}
      {/* Tampil di layar besar (lg) atau saat mobileView adalah 'chat' */}
      <div
        className={`
          ${mobileView === "chat" ? "flex" : "hidden md:flex"}
          rounded-2xl bg-blue-1 flex-1 flex-col overflow-auto
        `}
      >
        {/* Header Chat dengan tombol navigasi mobile */}
        <div className="flex items-start gap-1 p-6 sticky top-0 z-10 backdrop-blur-md bg-blue-1/80">
          {/* Tombol untuk kembali ke daftar chat di mobile */}
          <ButtonPrimary
            className="lg:hidden mr-2"
            onClick={() => setMobileView("list")}
          >
            <ChevronLeft className="stroke-blue-3 lg:size-5 size-4" />  
          </ButtonPrimary>

          <h1 className="lg:text-lg md:text-base text-sm font-semibold">
            {chatData?.room?.name || "Group Chat"}
          </h1>

          <div className="ml-auto flex items-center gap-1">
            <ButtonPrimary
              className="xl:hidden"
              onClick={() => setMobileView("files")}
            >
              <FolderOpen className="lg:size-5 size-4" />
              {/* <FolderOpen /> */}
            </ButtonPrimary>
            <ButtonPrimary className="flex gap-2 lg:text-sm text-xs">
              <p className="lg:block hidden">Message</p>
              <Send className="lg:size-5 size-4" />
            </ButtonPrimary>
            <ButtonPrimary className="flex gap-2 lg:text-sm text-xs">
              <p className="lg:block hidden">Participants</p>
              <UsersRound className="lg:size-5 size-4" />
            </ButtonPrimary>
          </div>
        </div>

        {/* Kontainer untuk pesan dan input bar */}
        <div className="flex flex-col flex-1 pt-0">
          <div className="flex-1 flex flex-col gap-1.5 space-y-2 py-4 overflow-auto p-6">
            <ChatMessages chatData={chatData} />
          </div>

          {/* Input Bar Sticky */}
          <div className="sticky bottom-0 backdrop-blur-md px-6 pb-6">
            <div className="flex items-center md:gap-3 gap-1 bg-blue-bg rounded-2xl p-2 focus-within:bg-blue-bg/70 mt-auto">
              <button className="text-blue-3 hover:text-cream transition-colors md:p-2 p-0.5 cursor-pointer">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="md:flex-1 md:text-sm lg:text-base text-xs w-full bg-transparent text-cream placeholder-blue-3/70 focus:outline-none py-2 px-2"
              />
              <button className="text-blue-3 hover:text-cream transition-colors p-2 cursor-pointer">
                <Smile size={18} />
              </button>
              <button className="bg-blue-3 hover:bg-blue-2 text-blue-bg rounded-full md:p-2 p-1 transition-colors cursor-pointer">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sesi shared files (Sidebar Kanan) */}
      {/* Tampil di layar besar (lg) atau saat mobileView adalah 'files' */}
      <div
        className={`
          ${mobileView === "files" ? "flex" : "xl:flex hidden"}
           flex-col gap-6 max-w-xs w-full overflow-auto
          absolute lg:relative inset-0 lg:inset-auto z-20 lg:z-auto bg-blue-bg lg:bg-transparent p-4 lg:p-0
        `}
      >
        <div className="flex gap-3 items-center border-b-[3px] border-blue-1 pb-6">
          {/* Tombol untuk kembali ke chat di mobile */}
          <ButtonPrimary
            className="lg:hidden"
            onClick={() => setMobileView("chat")}
          >
            <X size={16} />
          </ButtonPrimary>
          <h1 className="text-xl font-semibold">Shared Files</h1>
        </div>

        <div className="space-y-4">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt=""
            className="w-24 h-24 rounded-full mx-auto"
          />
          <div className="space-y-1">
            <h2 className="text-semibold text-lg text-center">
              {chatData?.room?.name || "Group Chat"}
            </h2>
            <p className="text-xs text-blue-3 text-center">
              {chatData?.room?.participant?.length} Participant
            </p>
          </div>

          <div className="flex gap-2">
            <div className="bg-blue-1 p-4 flex gap-2 rounded-lg items-end justify-center flex-1 cursor-pointer hover:bg-blue-2/50 duration-200 ease-in-out">
              <Folder className="stroke-blue-2/50 fill-blue-2/50 size-8" />
              <div className="space-y-0">
                <p className="text-xss">All files</p>
                <p className="text-lg">241</p>
              </div>
            </div>
            <div className="bg-blue-1 p-4 flex gap-2 rounded-lg items-end justify-center flex-1 cursor-pointer hover:bg-blue-2/50 duration-200 ease-in-out">
              <Link className="stroke-blue-2/50 size-8" />
              <div className="space-y-0">
                <p className="text-xss">All Links</p>
                <p className="text-lg">241</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-cream">File Type</h3>
            <EllipsisVertical className="stroke-blue-3 ml-auto cursor-pointer" />
          </div>

          {fileTypes.map((fileType) => (
            <FileTypeItem
              key={fileType.id}
              icon={fileType.icon}
              title={fileType.title}
              fileCount={fileType.fileCount}
              size={fileType.size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
