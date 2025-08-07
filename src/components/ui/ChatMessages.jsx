import ChatMessageTemplate from "./ChatMessageTemplate";

export default function ChatMessages({ chatData }) {
  if (!chatData?.comments) {
    return (
      <div className="flex-1 flex items-center justify-center text-blue-3/50">
        No messages yet
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-1.5 space-y-2 py-4">
      {chatData.comments.map((comment) => {
        // Cari participant berdasarkan sender
        const sender = chatData.room.participant.find(
          (p) => p.id === comment.sender
        );
        const isCurrentUser = comment.sender === "agent@mail.com";

        return (
          <ChatMessageTemplate
            key={comment.id}
            comment={comment}
            sender={sender}
            isCurrentUser={isCurrentUser}
            roomImageUrl={chatData.room.image_url}
          />
        );
      })}
    </div>
  );
}