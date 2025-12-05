"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { PanelLeft, PanelRight } from "lucide-react"

import { cn } from "@/lib/utils"

type SidebarContextValue = {
  open: boolean
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must be used inside SidebarProvider")
  }
  return ctx
}

type SidebarProviderProps = {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  const value = React.useMemo(
    () => ({
      open,
      toggle: () => setOpen((prev) => !prev),
    }),
    [open]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

type SidebarProps = React.HTMLAttributes<HTMLElement>

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <aside
        ref={ref}
        data-open={open}
        className={cn(
          "flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200",
          open ? "w-64" : "w-16",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-12 items-center border-b px-4 text-sm font-semibold",
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-y-auto px-2 py-4", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border-t px-4 py-3 text-sm", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("list-none", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

type SidebarMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  isActive?: boolean
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, asChild = false, isActive, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      ref={ref}
      data-active={isActive ? "" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "data-[active]:bg-sidebar-accent data-[active]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, toggle } = useSidebar()
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium",
        "hover:bg-muted",
        className
      )}
      aria-label={open ? "Fechar sidebar" : "Abrir sidebar"}
      {...props}
    >
      {open ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
    </button>
  )
}

export { useSidebar }
