import { useState } from "react";
import { Image, Video, FileText, X } from "lucide-react";

export default function ChatMessageTemplate({
  comment,
  sender,
  isCurrentUser,
  roomImageUrl,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const isText = comment.type === "text";
  const isImage = comment.type === "image";
  const isVideo = comment.type === "video";
  const isPdf = comment.type === "pdf";

  const attachment = comment.attachments?.[0];

  const openPdf = () => {
    if (attachment?.file_url) {
      window.open(attachment.file_url, "_blank");
    }
  };

  return (
    <>
      <div
        className={`flex items-start gap-2 ${isCurrentUser ? "ml-auto" : ""}`}
      >
        {!isCurrentUser && (
          <img
            src={roomImageUrl}
            className="w-8 h-8 rounded-full"
            alt={sender?.name || "User"}
          />
        )}

        <div className="relative space-y-1">
          <p className="text-xss">{sender?.name || "Unknown"}</p>

          <div
            className={` p-3 lg:max-w-[340px] max-w-[175px] w-full cursor-pointer ${
              isCurrentUser ? "bg-blue-3/20 rounded-l-lg rounded-br-lg" : "bg-blue-bg rounded-r-lg rounded-bl-lg"
            }`}
            onClick={() => {
              if (isPdf) openPdf();
              if (isImage || isVideo) setModalOpen(true);
            }}
          >
            {/* TEXT MESSAGE */}
            {isText && (
              <p className="md:text-sm text-xs">{comment.message}</p>
            )}

            {/* IMAGE PREVIEW */}
            {isImage && attachment && (
              <div className="relative">
                <img
                  src={attachment.file_url}
                  alt="Image Message"
                  className="rounded-md w-full blur-sm transition-all duration-300 hover:blur-none"
                />
                <Image className="absolute top-2 right-2 w-5 h-5 text-white" />
              </div>
            )}

            {/* VIDEO PREVIEW */}
            {isVideo && attachment && (
              <div className="relative">
                <video
                  src={attachment.file_url}
                  className="rounded-md w-full blur-sm bg-linear-to-b from-cream to-black"
                  muted
                  playsInline
                  preload="metadata"
                  poster="https://via.placeholder.com/300x200.png?text=Video"
                />
                <Video className="absolute top-2 right-2 w-5 h-5 text-white" />
              </div>
            )}

            {/* PDF PREVIEW */}
            {isPdf && (
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-3" />
                <p className="md:text-sm text-xs">Open the document</p>
              </div>
            )}

            {/* Time */}
            <span className="absolute bottom-0.5 right-1 text-blue-3 text-xss">
              17.55
            </span>
          </div>
        </div>
      </div>

      {/* MODAL IMAGE/VIDEO */}
      {modalOpen && (isImage || isVideo) && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-2 -right-2 z-50 text-white cursor-pointer"
            >
              <X className="lg:size-5 size-4" size={20} />
            </button>

            <div className="bg-black p-4 rounded-lg">
              {isImage && (
                <img
                  src={attachment.file_url}
                  alt="Zoomed Image"
                  className="w-full h-auto rounded-md"
                />
              )}
              {isVideo && (
                <video
                  src={attachment.file_url}
                  controls
                  autoPlay
                  className="w-full rounded-md"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
