import { useMemo, useState } from "react";

const getValueByPath = (obj, path) => {
  if (!path) return "";
  return path.split(".").reduce((acc, part) => {
    if (acc == null) return undefined;
    return acc[part];
  }, obj);
};

const compareValues = (leftValue, rightValue) => {
  if (typeof leftValue === "number" && typeof rightValue === "number") {
    return leftValue - rightValue;
  }

  const leftText = String(leftValue ?? "");
  const rightText = String(rightValue ?? "");

  return leftText.localeCompare(rightText, undefined, {
    sensitivity: "base",
  });
};

const useTableControls = (
  data = [],
  {
    searchKeys = [],
    defaultSortKey = null,
    dateRangeKey = null, // e.g. "date" or "start_date" - opt-in
  } = {}
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(
    defaultSortKey ? { key: defaultSortKey, direction: "asc" } : null
  );
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return { key, direction: "asc" };
    });
  };

  const setStartDate = (value) =>
    setDateRange((current) => ({ ...current, start: value }));

  const setEndDate = (value) =>
    setDateRange((current) => ({ ...current, end: value }));

  const clearDateRange = () => setDateRange({ start: "", end: "" });

  const visibleData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const source = Array.isArray(data) ? data : [];

    let filteredData = [...source];

    if (dateRangeKey && (dateRange.start || dateRange.end)) {
      filteredData = filteredData.filter((item) => {
        const rawValue = getValueByPath(item, dateRangeKey);
        const itemDate = rawValue?.slice ? rawValue.slice(0, 10) : rawValue;

        if (!itemDate) return false;
        if (dateRange.start && itemDate < dateRange.start) return false;
        if (dateRange.end && itemDate > dateRange.end) return false;

        return true;
      });
    }

    if (normalizedSearch && searchKeys.length) {
      filteredData = filteredData.filter((item) =>
        searchKeys.some((key) => {
          const value = getValueByPath(item, key);
          return String(value ?? "")
            .toLowerCase()
            .includes(normalizedSearch);
        })
      );
    }

    if (!sortConfig?.key) {
      return filteredData;
    }

    return [...filteredData].sort((left, right) => {
      const leftValue = getValueByPath(left, sortConfig.key);
      const rightValue = getValueByPath(right, sortConfig.key);

      const comparison = compareValues(leftValue, rightValue);

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, searchKeys, searchTerm, sortConfig, dateRangeKey, dateRange]);

  return {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    dateRange,
    setStartDate,
    setEndDate,
    clearDateRange,
    visibleData,
  };
};

export default useTableControls;
