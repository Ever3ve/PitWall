import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user";

export const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await getCurrentUser();
      setUser(res);
    }
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>{user.username}'s Profile</h1>
      <h2>Favorite Drivers:</h2>
      <ul>
        {user.favoriteDrivers?.map((driver: any) => (
          <li key={driver.id}>
            {driver.name} {driver.surname}
          </li>
        ))}
      </ul>
    </div>
  );
};
