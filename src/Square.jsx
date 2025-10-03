import styles from "./Square.module.css";
import { motion } from "framer-motion";

export default function Square({ onClick, value, highlight }) {
  return (
    <motion.div
      className={`${styles.square} ${highlight ? styles.highlight : ""}`}
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        color: value === "X" ? "#e63946" : "#457b9d",
        backgroundColor: highlight ? "#b3dba6af" : "",
      }}
    >
      {value}
    </motion.div>
  );
}
