import { getAllUsers } from "@/lib/api";
import { RestrictionsManager } from "@/components/restrictions-manager";
import { UserListData } from "@/lib/types";

export default async function ProtectedPage() {
  const uid = "user123";

  let userList: UserListData | undefined;

  try {
    userList = await getAllUsers();
  } catch (e) {
    console.error("Failed to fetch user list:", e);
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <RestrictionsManager
        initialUid={uid}
        allUsers={userList?.users ?? []}
      />
    </div>
  );
}
