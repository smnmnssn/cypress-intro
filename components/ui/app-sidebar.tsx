import { Calendar, Home, HomeIcon, Inbox, Search, Settings, User2Icon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Fastigheter",
    url: "/properties",
    icon: Home,
  },
  {
    title: "Kunder",
    url: "/clients",
    icon: User2Icon,
  },
  {
    title: "Dokument",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Kalender",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Sök",
    url: "#",
    icon: Search,
  },
  {
    title: "Inställningar",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mäklarappen</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}