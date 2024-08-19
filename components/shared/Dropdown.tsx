import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import React from "react";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AutoComplete, type Option } from "./autocomplete";

const Dropdown = () => {
  const FRAMEWORKS = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);
  const [value, setValue] = useState<Option>();

  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button
          className="inline-flex h-10 items-center justify-center rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setLoading((prev) => !prev)}
        >
          Toggle loading
        </button>
        <button
          className="inline-flex h-10 items-center justify-center rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setDisbled((prev) => !prev)}
        >
          Toggle disabled
        </button>
      </div>
      <AutoComplete
        options={FRAMEWORKS}
        emptyMessage="No resulsts."
        placeholder="Find something"
        isLoading={isLoading}
        onValueChange={setValue}
        value={value}
        disabled={isDisabled}
      />
      <span className="text-sm">
        Current value: {value ? value?.label : "No value selected"}
      </span>
      <span className="text-sm">
        Loading state: {isLoading ? "true" : "false"}
      </span>
      <span className="text-sm">Disabled: {isDisabled ? "true" : "false"}</span>
    </div>
  );
};

export default Dropdown;
