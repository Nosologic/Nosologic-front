import styles from "../styles/components/MobileNavigationOverlay.module.scss"
import {IoIosClose} from "react-icons/io";
import NavMenu from "./Header/NavMenu.tsx";
import {useIsMobile} from "../hooks/useIsMobile.tsx";

interface MobileNavigationOverlayProps {
    isOpen: boolean,
    onClose: () => void,
}

export default function MobileNavigationOverlay({ isOpen, onClose } : Readonly<MobileNavigationOverlayProps>) {
    const isMobile = useIsMobile();

    if (!isMobile) {
        onClose();
        return null;
    }

    return (
        isOpen &&
        (<div className={styles.mobile_nav_overlay}>
            <IoIosClose className={styles.close_btn} onClick={onClose}/>
            <NavMenu close={onClose}/>
        </div>)
    );
}