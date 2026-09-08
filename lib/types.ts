export interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: string;
  featured?: boolean;
  isPremiumPartner?: boolean;
}

export interface LinkCategory {
  id: string;
  label: string;
  description: string;
  items: LinkItem[];
}

export interface LinksData {
  categories: LinkCategory[];
}

export interface ContentSlotConfig {
  id: string;
  slotId: string;
  format: "rectangle" | "horizontal" | "vertical";
  label: string;
  placement: "sidebar" | "content" | "footer";
}

export interface MetricsData {
  provider: string;
  client: string;
  slots: ContentSlotConfig[];
}
