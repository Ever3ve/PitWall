import { useState, useEffect } from "react";
import { getCalendar } from "../api/calendar";

export const Calendar = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSessions = async (selectedYear: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await getCalendar(selectedYear);
      setSessions(res.data);
    } catch (err: any) {
      setError(err?.message || "Error fetching sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions(year);
  }, [year]);

  return (
    <div className="calendar-page">
      <h1>Calendar</h1>

      <div>
        <label>Year: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      {loading && <p>Loading sessions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <strong>{session.type}</strong> - {session.grandPrix.name} -{" "}
            {new Date(session.startTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
