import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";

export interface CalendarProps {
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
  className?: string;
}

const Calendar = ({ mode = "single", selected, onSelect, className }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (mode === "single" && selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }
    if (mode === "multiple" && Array.isArray(selected)) {
      return selected.some(d => d.toDateString() === date.toDateString());
    }
    return false;
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (mode === "single") {
      onSelect?.(date);
    } else if (mode === "multiple") {
      const selectedDates = Array.isArray(selected) ? selected : [];
      const exists = selectedDates.some(d => d.toDateString() === date.toDateString());
      if (exists) {
        onSelect?.(selectedDates.filter(d => d.toDateString() !== date.toDateString()));
      } else {
        onSelect?.([...selectedDates, date]);
      }
    }
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={cn(
          "p-2 text-center text-sm rounded-xl hover:bg-gray-100 transition-colors",
          isSelected(day) && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={cn("p-3 rounded-2xl border bg-white", className)}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded-xl">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-xl">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(name => (
          <div key={name} className="text-center text-xs font-medium text-gray-600 p-2">
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
