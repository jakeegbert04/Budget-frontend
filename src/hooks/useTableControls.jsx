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
  { searchKeys = [], defaultSortKey = null } = {}
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(
    defaultSortKey ? { key: defaultSortKey, direction: "asc" } : null
  );

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

  const visibleData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const source = Array.isArray(data) ? data : [];

    let filteredData = [...source];

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
  }, [data, searchKeys, searchTerm, sortConfig]);

  return {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    visibleData,
  };
};

export default useTableControls;
