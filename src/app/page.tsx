import MatchingGame from "@/components/MatchingGame";

export default function Home() {
  const DATA = {
    India: "Delhi",
    China: "Beijing",
    Russia: "Moscow",
    Afghanistan: "Kabul",
    France: "Paris",
    Germany: "Berlin",
    England: "London",
  };

  return (
    <div>
      <MatchingGame data={DATA} />
    </div>
  );
}
