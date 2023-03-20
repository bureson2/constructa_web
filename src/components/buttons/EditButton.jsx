import styles from "./style.module.scss";
import icon from "../../images/edit_icon.svg"
function EditButton(props) {
    return (
        <button className={`${styles.button} ${styles.editButton}`}>
            <img src={icon} alt="Edit Icon" />
        </button>
    );
}

export default EditButton;