import styles from "../style.module.scss";
import UserInput from "../../inputs/UserInput";

const CreateProject = () => {
    return (
        <form className={styles.form}>
            <UserInput/>
        </form>
    );
}

export default CreateProject;