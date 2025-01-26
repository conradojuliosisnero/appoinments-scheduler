"use client";
import { useEffect, useState } from "react";
import styles from "../styles/filter.module.css";
import { useDispatch } from "react-redux";
import { setFiltersFind, setFilters } from "@/slices/dashboardSlice";
import { Input, Select } from "antd";

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

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  return (
    <div className={styles.filterSection}>
      <Input
        type="text"
        placeholder="Buscar por título..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className={styles.searchInput}
      />
      <Select
        value={statusFilter}
        onChange={handleStatusChange}
        className={styles.filterSelect}
      >
        <Select.Option value="all">Todos</Select.Option>
        <Select.Option value="pending">Pendientes</Select.Option>
        <Select.Option value="confirmed">Completados</Select.Option>
        <Select.Option value="cancelled">Cancelados</Select.Option>
      </Select>
    </div>
  );
};

export default FilterCalendar;
