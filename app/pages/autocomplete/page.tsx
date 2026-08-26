"use client";
import AutoComplete from "@/app/components/AutoComplete";
import React, { useState, useEffect } from "react";

type Option = {
  label: string | number;
  value: string | number;
  info?: string;
};

const BASE_URL = "https://cis.app.miratsapiservices.com/v2/cis/countries";

const AutoCompletePage = () => {
  const [multiValue, setMultiValue] = useState<Option[]>([]);
  const [singleValue, setSingleValue] = useState<Option[]>([]);
  const [data, setData] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BASE_URL}?page=${page}&limit=10&search=${encodeURIComponent(query)}`,
        );
        const json = await res.json();

        const incoming =
          json?.data?.map((c: any) => ({
            label: c.name,
            value: c.alpha2Code,
            info: c.alpha3Code,
          })) || [];

        setData((prev) => (page === 1 ? incoming : [...prev, ...incoming]));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, query]);

  const onSearch = ({ query: q, page: p }: { query: string; page: number }) => {
    setQuery(q);
    setPage(p);
  };
  return (
    <div className="flex justify-center gap-5 p-20 max-w-5xl mx-auto">
      <AutoComplete
        selected={multiValue}
        setSelected={setMultiValue}
        multiple
        search
        dropdownFooter
        dropdownText="Select Multiple"
        options={data}
        hasMore={true}
        loading={loading}
        onSearch={onSearch}
        onApply={() => console.log("Applied:", multiValue)}
      />
      <AutoComplete
        selected={singleValue}
        setSelected={setSingleValue}
        search
        position="top"
        dropdownText="Select one"
        options={data}
        hasMore={true}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  );
};

export default AutoCompletePage;
