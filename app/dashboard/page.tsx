import { getAllUsers } from "@/lib/api";
import { RestrictionsManager } from "@/components/restrictions-manager";
import { UserListData } from "@/lib/types";

export default async function ProtectedPage() {
  let userList: UserListData | undefined;
  let defaultUid = "";

  try {
    console.log("🔄 Dashboard Page: Fetching users on server-side...");
    userList = await getAllUsers();
    console.log(
      "✅ Dashboard Page: Users fetched successfully:",
      userList?.users?.length || 0,
      "users"
    );
    // Use the first user as default if available - handle both string UIDs and User objects
    const firstUser = userList?.users?.[0];
    defaultUid =
      typeof firstUser === "string" ? firstUser : firstUser?.uid || "";
    console.log("🎯 Dashboard Page: Default UID set to:", defaultUid);
  } catch (e) {
    console.error("❌ Dashboard Page: Failed to fetch user list:", e);
  }

  return (
    <div className="flex flex-col gap-8 max-w-full mx-auto">
      <RestrictionsManager
        initialUid={defaultUid}
        allUsers={userList?.users ?? []}
      />
    </div>
  );
}
