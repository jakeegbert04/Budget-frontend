// components/transactions/DateFilter.jsx
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

const CalendarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DateFilter = ({
  dateRange,
  setStartDate,
  setEndDate,
  clearDateRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useClickOutside(popoverRef, () => setIsOpen(false));

  const hasDateFilter = Boolean(dateRange.start || dateRange.end);

  return (
    <div className="date-filter" ref={popoverRef}>
      <button
        type="button"
        className={`icon-btn${hasDateFilter ? " icon-btn--active" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Filter by date range"
      >
        <CalendarIcon />
        {hasDateFilter && <span className="icon-btn__dot" />}
      </button>

      {isOpen && (
        <div className="date-popover">
          <label className="date-popover__field">
            <span>From</span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className="date-popover__field">
            <span>To</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          {hasDateFilter && (
            <button
              type="button"
              className="date-popover__clear"
              onClick={clearDateRange}
            >
              Clear dates
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DateFilter;
