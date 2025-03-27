import Image from "next/image";
import { UserData } from "./registrationcontext";



const Avatar = ({user} :{user:UserData}) => {
    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName || !lastName) return "👤";
        return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
      };
    return (
        <>
        {user && (
            <div className="flex flex-col items-center gap-2">
              {user?.profileImage && (
                <Image
                src={user?.profileImage ? user.profileImage : "/profile.png"}
                  alt="Profile Image"
                  height={25}
                  width={25}
                  className="rounded-full border border-white shadow-sm"
                />
              )}

<span className="text-sm font-medium">
            {getInitials(user?.lastName, user?.firstName)}
          </span>
        </div>
      )}
      </>
    )
    

}
export default Avatar;