export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  profilePictureUrl?: string;
  createdAt: number;
}

export interface ProfileInput {
  username: string;
  displayName: string;
  profilePictureUrl?: string;
}

export function isProfileComplete(profile: UserProfile | null): boolean {
  if (!profile) return false;
  return (
    profile.username.trim().length > 0 && profile.displayName.trim().length > 0
  );
}
