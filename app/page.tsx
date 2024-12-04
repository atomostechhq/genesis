import { getAllLanguages } from "./action";
import Test from "./Test";

export default async function Home() {
  const languages = await getAllLanguages();
  return (
    <main className="min-h-screen">
      <h1 className="text-xl font-bold">ATOMOS GENESIS COMPONENT LIBRARY</h1>
      <Test languages={languages} />
    </main>
  );
}
