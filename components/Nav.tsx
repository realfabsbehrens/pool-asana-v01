"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/toggle-mode";
import { InfoButton } from "./infoButton";

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <p className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
              {" "}
              poool x asana
            </p>
          </li>

          <li className="flex items-center justify-between gap-4">
            <Button variant={"secondary"}>
              {" "}
              <a
                href="https://cloud.mongodb.com/v2/65a80924618087756c4d957e#/overview"
                target="blank"
              >
                Datenbank{" "}
              </a>
            </Button>

            <InfoButton></InfoButton>
            <ModeToggle></ModeToggle>
          </li>
        </ul>
      </nav>
    </header>
  );
}
