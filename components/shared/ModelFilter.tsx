"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vehicleModels } from "@/constants";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ModelFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectCategory = (make: string) => {
    let newUrl = "";

    if (make && make !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehiclemake",
        value: make,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehiclemake"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="w-full overflow-hidden rounded-full px-4 py-2">
        <Autocomplete
          id="vehiclemake"
          options={vehicleModels}
          getOptionLabel={(option) => option.make}
          value={vehicleModels.find((vehicle) => vehicle.make) || null}
          onChange={(event, newValue) => {
            onSelectCategory(newValue?.make ?? "");
          }}
          renderInput={(field) => (
            <TextField {...field} label="Vehicle Make*" />
          )}
        />
      </div>
    </div>
  );
};

export default ModelFilter;
