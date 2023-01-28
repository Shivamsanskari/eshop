import styles from "./Card.module.scss";

const Card = ({ cardClass, children}) => {
  return <div className={`${cardClass} ${styles.card}`}>{children}</div>;
};

export default Card;