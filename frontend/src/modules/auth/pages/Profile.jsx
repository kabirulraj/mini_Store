import { useEffect } from "react";
import { useUser } from "../../../context/UseAuthContext";
import useApi from "../../../shared/api";

const Profile = () => {
  const authContext = useUser();
  const api = useApi();

  async function fetchProfile() {
    try {
      const response = await api.get("/auth/me");
      authContext.setuser(response.data.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const user = authContext.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-purple-500/30 border-2 border-purple-400/40 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-purple-200">
                {user?.name?.[0]?.toUpperCase() ?? "?"}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{user?.name ?? "Loading..."}</h1>
            <p className="text-slate-400 text-sm mt-1">{user?.email ?? ""}</p>
          </div>

          {/* Info Cards */}
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Name</p>
                <p className="text-white text-sm font-medium">{user?.name ?? "—"}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                <p className="text-white text-sm font-medium">{user?.email ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
