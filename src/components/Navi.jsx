import styles from "./Navi.module.css";

const Navi = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.logo}>Map</div>
      <div className={styles.menu.li}></div>
    </div>
  );
};

export default Navi;
