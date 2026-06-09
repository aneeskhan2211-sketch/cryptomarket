import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserProfile } from "@/lib/api";
import type { ProfileInput, UserProfile } from "@/types/profile";
import { Camera, Loader2, Upload, User } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ProfileSetupModalProps {
  open: boolean;
  onClose: () => void;
  existingProfile?: UserProfile | null;
  isSetup?: boolean;
}

export function ProfileSetupModal({
  open,
  onClose,
  existingProfile,
  isSetup = false,
}: ProfileSetupModalProps) {
  const [username, setUsername] = useState(existingProfile?.username ?? "");
  const [displayName, setDisplayName] = useState(
    existingProfile?.displayName ?? "",
  );
  const [avatarUrl, setAvatarUrl] = useState(
    existingProfile?.profilePictureUrl ?? "",
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateProfile = useUpdateUserProfile();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Bild darf maximal 2 MB groß sein");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Bitte ein Bild auswählen");
      return;
    }

    setUploading(true);
    try {
      // Use object-storage upload endpoint
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/object-storage/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload fehlgeschlagen");
      const json: { url: string } = await res.json();
      setAvatarUrl(json.url);
      toast.success("Profilbild hochgeladen");
    } catch {
      // Fallback: use local object URL for preview while saving data URI
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const trimmedUsername = username.trim();
    const trimmedDisplayName = displayName.trim();

    if (trimmedUsername.length < 3) {
      toast.error("Benutzername muss mindestens 3 Zeichen haben");
      return;
    }
    if (trimmedDisplayName.length < 1) {
      toast.error("Bitte gib deinen Anzeigenamen ein");
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      toast.error(
        "Benutzername darf nur Buchstaben, Zahlen, _ und - enthalten",
      );
      return;
    }

    const input: ProfileInput = {
      username: trimmedUsername,
      displayName: trimmedDisplayName,
      profilePictureUrl: avatarUrl.length > 0 ? avatarUrl : undefined,
    };

    updateProfile.mutate(input, {
      onSuccess: () => {
        toast.success(
          isSetup ? "Profil erstellt! Willkommen!" : "Profil aktualisiert",
        );
        onClose();
      },
      onError: () => {
        toast.error("Fehler beim Speichern des Profils");
      },
    });
  };

  const initials = displayName
    ? displayName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0] ?? "")
        .join("")
        .toUpperCase()
    : username.slice(0, 2).toUpperCase() || "?";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="profile_setup.dialog">
        <DialogHeader>
          <DialogTitle>
            {isSetup ? "Willkommen bei CryptoMarket!" : "Profil bearbeiten"}
          </DialogTitle>
          <DialogDescription>
            {isSetup
              ? "Richte deinen Account ein — du kannst dein Profil jederzeit ändern."
              : "Aktualisiere deinen Benutzernamen, Anzeigenamen und dein Profilbild."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <Avatar className="h-20 w-20 ring-2 ring-border">
                <AvatarImage
                  src={avatarUrl || undefined}
                  alt="Profilbild"
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/15 text-primary font-bold text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                data-ocid="profile_setup.upload_button"
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                aria-label="Profilbild ändern"
              >
                {uploading ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <Camera className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="profile_setup.upload_label_button"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Hochladen...
                </>
              ) : (
                <>
                  <Upload className="h-3 w-3" />
                  Bild auswählen (max. 2 MB)
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Profilbild hochladen"
            />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-displayName" className="text-sm">
                Anzeigename <span className="text-destructive">*</span>
              </Label>
              <Input
                id="profile-displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="z.B. Max Mustermann"
                maxLength={50}
                data-ocid="profile_setup.displayName_input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-username" className="text-sm">
                Benutzername <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  @
                </span>
                <Input
                  id="profile-username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                    )
                  }
                  placeholder="benutzername"
                  className="pl-7"
                  maxLength={30}
                  data-ocid="profile_setup.username_input"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Nur Buchstaben, Zahlen, _ und - erlaubt
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-1">
            {!isSetup && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                data-ocid="profile_setup.cancel_button"
              >
                Abbrechen
              </Button>
            )}
            <Button
              type="button"
              onClick={handleSave}
              disabled={updateProfile.isPending || uploading}
              data-ocid="profile_setup.submit_button"
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Speichern...
                </>
              ) : isSetup ? (
                "Account einrichten"
              ) : (
                "Speichern"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
