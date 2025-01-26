import styles from "../styles/appoinments.module.css";

const FilterBar = ({ statusFilter, setStatusFilter }) => {
  return (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className={styles.filterBar}
    >
      <option value="all">Todos los estados</option>
      <option value="pendiente">Pendiente</option>
      <option value="completada">Completada</option>
      <option value="cancelada">Cancelada</option>
    </select>
  );
};

export default FilterBar;
