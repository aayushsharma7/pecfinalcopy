"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Edit2, Save, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfile {
  id: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  gamesPlayed: number;
  gamesWon: number;
  createdAt: string;
}

export default function UserProfileView() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setBio(data.user.bio || "");
        setAvatar(data.user.avatar || "");
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, avatar }),
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-primary">Loading magic scroll...</div>;
  }

  if (!user) {
    return <div className="text-center text-muted-foreground">Please login to view your scroll.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Profile Card */}
        <Card className="md:col-span-1 glass-panel border-primary/20">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-4xl font-bold text-black shadow-xl shadow-amber-500/20 overflow-hidden border-4 border-black/30">
                {avatar ? (
                  <img src={avatar} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                  user.username.substring(0, 2).toUpperCase()
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white">Change URL</span>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold gold-gradient-text font-serif">{user.username}</h2>
              <p className="text-sm text-muted-foreground">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="w-full pt-4 border-t border-primary/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xl font-bold text-foreground">{user.gamesWon}</div>
                  <div className="text-xs text-muted-foreground">Victories</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <Gamepad2 className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-xl font-bold text-foreground">{user.gamesPlayed}</div>
                  <div className="text-xs text-muted-foreground">Journeys</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2 glass-panel border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between border-b border-primary/10 pb-4">
            <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
              <User className="w-5 h-5" />
              Traveler's Log
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="text-primary hover:bg-primary/10"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Scroll
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Details
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">About Me</label>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl bg-black/20 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Tell your tale..."
                />
              ) : (
                <p className="text-foreground/90 leading-relaxed italic">
                  {user.bio || "No tales written yet..."}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Avatar URL</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
