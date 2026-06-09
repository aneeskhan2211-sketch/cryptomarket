import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserProfile } from "@/types/profile";
import { LogOut, Settings, User } from "lucide-react";

interface ProfileDropdownProps {
  profile: UserProfile | null;
  onLogout: () => void;
  onEditProfile: () => void;
}

export function getInitials(profile: UserProfile | null): string {
  if (!profile) return "?";
  if (profile.displayName) {
    return profile.displayName
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }
  return profile.username.slice(0, 2).toUpperCase();
}

export function ProfileAvatar({
  profile,
  size = "sm",
}: {
  profile: UserProfile | null;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return (
    <Avatar
      className={`${dim} ring-2 ring-primary/30 ring-offset-1 ring-offset-background transition-all duration-200 hover:ring-primary/60`}
    >
      <AvatarImage
        src={profile?.profilePictureUrl}
        alt={profile?.displayName ?? "Profil"}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/15 text-primary font-semibold text-[11px]">
        {getInitials(profile)}
      </AvatarFallback>
    </Avatar>
  );
}

export function ProfileDropdown({
  profile,
  onLogout,
  onEditProfile,
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        data-ocid="header.profile_button"
        aria-label="Profil-Menü öffnen"
      >
        <button
          type="button"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ProfileAvatar profile={profile} size="sm" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56"
        data-ocid="header.profile_dropdown"
      >
        <DropdownMenuLabel className="pb-1">
          <div className="flex items-center gap-2.5">
            <ProfileAvatar profile={profile} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {profile?.displayName || profile?.username || "Kein Name"}
              </p>
              {profile?.username && (
                <p className="text-xs text-muted-foreground truncate">
                  @{profile.username}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onEditProfile}
            data-ocid="header.edit_profile_button"
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            Profil bearbeiten
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            data-ocid="header.logout_button"
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
