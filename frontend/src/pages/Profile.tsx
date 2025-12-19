import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user"; // твій axios fetch

export const Profile = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentUser();
        setFavorites(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (!favorites.length) return <p>Немає даних</p>;

  return (
    <div>
      <h1>Профіль</h1>
      <h2>Любімки:</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>
            {item.driver.name} {item.driver.surname} — #{item.driver.carNumber}{" "}
            ({item.driver.country})
          </li>
        ))}
      </ul>
    </div>
  );
};
