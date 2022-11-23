import classNames from "classnames";
import Image from "next/image";
import portalimg from "../public/portal.png";
import styles from "../styles/portal.module.css";

const portal = () => {
  return (
    <>
     

      <div className={classNames(styles.body, styles.portal_frame)}>
        <div className={styles.portal_pulse}>
          <Image className={styles.portal_spin} src={portalimg} alt="" width="250" height="250" />
        </div>
        <div className={styles.portal2}>
          <Image src={portalimg} alt="" width="250" height="250" />
        </div>
      </div>
    </>
  );
};

export default portal;
