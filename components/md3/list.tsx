"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  dense?: boolean
  disablePadding?: boolean
}

export function List({ className, dense = false, disablePadding = false, ...props }: ListProps) {
  return <ul className={cn("w-full", !disablePadding && "py-2", dense && "py-1", className)} {...props} />
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  disablePadding?: boolean
  disableGutters?: boolean
  dense?: boolean
  selected?: boolean
  alignItems?: "flex-start" | "center"
  secondaryAction?: React.ReactNode
}

export function ListItem({
  className,
  disablePadding = false,
  disableGutters = false,
  dense = false,
  selected = false,
  alignItems = "center",
  secondaryAction,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cn(
        "relative flex w-full transition-colors",
        !disablePadding && "py-2",
        !disableGutters && "px-4",
        dense && "py-1",
        selected && "bg-accent text-accent-foreground",
        alignItems === "flex-start" && "items-start",
        alignItems === "center" && "items-center",
        secondaryAction && "pr-14",
        className,
      )}
      {...props}
    >
      {props.children}
      {secondaryAction && <div className="absolute right-4 top-1/2 -translate-y-1/2">{secondaryAction}</div>}
    </li>
  )
}

interface ListItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  alignItems?: "flex-start" | "center"
  dense?: boolean
  disableGutters?: boolean
  disablePadding?: boolean
  selected?: boolean
  component?: React.ElementType
}

export function ListItemButton({
  className,
  alignItems = "center",
  dense = false,
  disableGutters = false,
  disablePadding = false,
  selected = false,
  component: Component = "button",
  ...props
}: ListItemButtonProps) {
  return (
    <Component
      className={cn(
        "flex w-full cursor-pointer items-center rounded-md text-left outline-none transition-colors hover:bg-accent focus-visible:bg-accent hover:text-accent-foreground focus-visible:text-accent-foreground",
        !disablePadding && "py-2",
        !disableGutters && "px-4",
        dense && "py-1",
        selected && "bg-accent text-accent-foreground",
        alignItems === "flex-start" && "items-start",
        alignItems === "center" && "items-center",
        className,
      )}
      {...props}
    />
  )
}

interface ListItemIconProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ListItemIcon({ className, ...props }: ListItemIconProps) {
  return <div className={cn("mr-4 min-w-[40px] text-muted-foreground", className)} {...props} />
}

interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
  inset?: boolean
}

export function ListItemText({ className, primary, secondary, inset = false, ...props }: ListItemTextProps) {
  return (
    <div className={cn("min-w-0 flex-1", inset && "pl-14", className)} {...props}>
      {primary && <div className="text-base leading-6 text-foreground">{primary}</div>}
      {secondary && <div className="text-sm text-muted-foreground">{secondary}</div>}
    </div>
  )
}

interface ListItemAvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ListItemAvatar({ className, ...props }: ListItemAvatarProps) {
  return <div className={cn("mr-4 flex-shrink-0", className)} {...props} />
}

interface ListSubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disableGutters?: boolean
  disablePadding?: boolean
  disableSticky?: boolean
}

export function ListSubheader({
  className,
  inset = false,
  disableGutters = false,
  disablePadding = false,
  disableSticky = false,
  ...props
}: ListSubheaderProps) {
  return (
    <div
      className={cn(
        "text-sm font-medium text-muted-foreground",
        !disablePadding && "py-2",
        !disableGutters && "px-4",
        !disableSticky && "sticky top-0 z-10 bg-background",
        inset && "pl-14",
        className,
      )}
      {...props}
    />
  )
}
