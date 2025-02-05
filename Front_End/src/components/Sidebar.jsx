import { useEffect, useState } from "react";
import { useChatStore } from "../store/UseChatStore";
import { useAuthStore } from "../store/UseAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";


const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers  } = useAuthStore(); // ✅ Ensure `onlineUsers` is always an array
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
 
 console.log(users)
  useEffect(() => {
    getUsers();
   
  },[getUsers]);

  //THIS WILL GET THE ONLINE PEOPLR DATA
const filteredUsers = showOnlineOnly
  ? (users ?? []).filter((user) =>
      (onlineUsers ?? []).some((onlineUser) => onlineUser._id === user._id)
    )
  : users ?? [];

  

  
  //THIS COMPONENT WILL APPAIR IF THE LODING STATE IS TRUE
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    //THIS WII BE IN THE LEFTSIDE OF THE SCREEN SO WE USE ASIDE TAG
    <aside className="flex flex-col w-20 h-full transition-all duration-200 border-r lg:w-72 border-base-300">
      <div className="w-full p-5 border-b border-base-300">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="items-center hidden gap-2 mt-3 lg:flex">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({(onlineUsers?.length ?? 0) - 1} online)
          </span>
        </div>
      </div>

      <div className="w-full py-3 overflow-y-auto">
        {/* Show loading message while users are being fetched */}
        {isUsersLoading ? (
          <div className="py-4 text-center text-zinc-500">Loading users...</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
          ${
            selectedUser?._id === user._id
              ? "bg-base-300 ring-1 ring-base-300"
              : ""
          }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="object-cover rounded-full size-12"
                />
                {/* Show green dot if user is online */}
                {Array.isArray(onlineUsers) &&
                  onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900" />
                  )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden min-w-0 text-left lg:block">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {Array.isArray(onlineUsers) && onlineUsers.includes(user._id)
                    ? "Online"
                    : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="py-4 text-center text-zinc-500">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;




