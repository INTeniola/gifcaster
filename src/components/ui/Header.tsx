"use client";

import { APP_NAME } from "~/lib/constants";

interface HeaderProps {
  _user?: any; // We'll type this properly once we have the NeynarUser type
}

export function Header({ _user }: HeaderProps) {
  return (
    <div className="relative">
      <div className="mt-4 mb-4 mx-4 px-2 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border-[3px] border-double border-primary">
        <div className="text-lg font-medium text-center w-full">
          {APP_NAME}
        </div>
      </div>
    </div>
  );
}
