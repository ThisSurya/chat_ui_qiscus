import { ChevronRight } from "lucide-react";

export default function FileTypeItem({ icon: Icon, title, fileCount, size }) {
  return (
    <div className="flex gap-4 cursor-pointer">
      <div className="rounded-lg p-3 flex border-2 border-blue-3">
        <Icon className="stroke-blue-3 fill-blue-bg size-4" />
      </div>
      <div className="flex-1 flex items-center">
        <div className="space-y-1 flex-1">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xss text-blue-3">{fileCount} Files, {size}</p>
        </div>
        <ChevronRight className="stroke-blue-3 size-4" />
      </div>
    </div>
  );
}