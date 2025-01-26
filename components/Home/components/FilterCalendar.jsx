"use client";
import { useEffect, useState } from "react";
import styles from "../styles/filter.module.css";
import { useDispatch } from "react-redux";
import { setFiltersFind, setFilters } from "@/slices/dashboardSlice";

const FilterCalendar = ({ events }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const dispatch = useDispatch();

  const filteredEvents = events?.filter((event) => {
    const matchTitle = event.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const matchStatus = statusFilter === "all" || event.status === statusFilter;
    return matchTitle && matchStatus;
  });

  useEffect(() => {
    dispatch(setFilters(statusFilter));
    dispatch(setFiltersFind(filteredEvents));
  }, [statusFilter, searchTitle]);

  return (
    <div className={styles.filterSection}>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="confirmed">Confirmado</option>
        <option value="cancelled">Cancelado</option>
      </select>
    </div>
  );
};

export default FilterCalendar;
