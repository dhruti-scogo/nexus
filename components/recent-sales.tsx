import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { DomainData, DomainVisitData } from "@/lib/types";

function getFaviconUrl(domain: string) {
  // a url might be like https://www.google.com, so we need to extract the domain
  try {
    const url = new URL(domain);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
  } catch (error) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }
}

export function RecentSales({
  data,
  keyName = "summaryTime",
}: {
  data: (DomainData | DomainVisitData)[];
  keyName?: "summaryTime" | "counter";
}) {
  const renderValue = (item: DomainData | DomainVisitData) => {
    if (keyName === "summaryTime" && "summaryTime" in item) {
      return (item as DomainData).summaryTime;
    }
    if (keyName === "counter" && "counter" in item) {
      return (item as DomainVisitData).counter;
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {data.map((item) => (
        <div className="flex items-center" key={item.url}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={getFaviconUrl(item.url)} alt="Avatar" />
            <AvatarFallback>{item.url.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.url}</p>
          </div>
          <div className="ml-auto font-medium">
            {renderValue(item)}
          </div>
        </div>
      ))}
    </div>
  );
} 