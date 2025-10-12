import React, { useEffect, useState } from "react";
import Card from "./components/ui/card";
import Button from "./components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Set the target date here (change as needed)
 * Example: new Date("2025-09-20T00:00:00")
 */
const targetDate = new Date("2025-11-27T00:00:00");
const eventDurationDays = 5; // duration in days

function getTimeParts(diffMs: number) {
  const totalSec = Math.max(Math.floor(diffMs / 1000), 0);
  const days = Math.floor(totalSec / (24 * 3600));
  const hours = Math.floor((totalSec % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = Math.floor(totalSec % 60);
  return { days, hours, minutes, seconds };
}

function formatTwo(n: number) {
  return String(n).padStart(2, "0");
}

export default function App(): JSX.Element {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 250); // update 4x/sec for smoothness
    return () => clearInterval(id);
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  const { days, hours, minutes, seconds } = getTimeParts(diff);

  // poem lines
  const poem = [
    "În ciubăr mare ne-adunăm,",
    "Cinci prieteni ne distrăm.",
    "Vlad Jurj focul îl veghează,",
    "Bogdan grătarul înflăcărează.",
    "Vlad Șiculan sparge lemne,",
    "Nico și Rebeca stau pe perne.",
    "Cu manele și bere rece,",
    "Nimeni nu ne-ntrece!",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#f5b6b3] flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Marea Ciubăreală — Countdown</h1>
        <h2 className="text-lg font-semibold">Hikereala - VII</h2>
        <h2 className="text-lg font-semibold">Ciubareala - V</h2>
      <Card className="w-full max-w-md mb-6">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Până la eveniment</h2>
        </div>
        <div className="card-content flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600">Perioadă: {eventDurationDays} zile de distracție</p>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
              <TimeBox label="Zile" value={String(days)} />
              <TimeBox label="Ore" value={formatTwo(hours)} />
              <TimeBox label="Min" value={formatTwo(minutes)} />
              <TimeBox label="Sec" value={formatTwo(seconds)} />
            </div>
          </div>

          <div className="w-full flex justify-center mt-2">
            <Button variant="ghost" onClick={() => alert("Să înceapă petrecerea!")}>
              Remind me
            </Button>
          </div>
        </div>
      </Card>

      <Card className="w-full max-w-md mb-6">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Poezie pentru prieteni</h2>
        </div>
        <div className="card-content">
          {poem.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </Card>

      <Card className="w-full max-w-md">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Roluri</h2>
        </div>
        <div className="card-content">
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>Bogdan — se ocupă de grătar</li>
            <li>Vlad Șiculan — sparge lemne</li>
            <li>Vlad Jurj — se ocupă de foc</li>
            <li>Nico & Rebeca — se relaxează la TV</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-md px-3 py-4 w-full text-center shadow"
        >
          <div className="text-xl font-mono tabular-nums">{value}</div>
        </motion.div>
      </AnimatePresence>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </div>
  );
}
