import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./style.module.scss";
import SideNavigation from "../navigation/SideNavigation";

function Layout(props) {
    const { tableElement } = props;

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <Header className={styles.header} />
            </header>
            <div className={styles.container}>
                <nav className={styles.sidebar}>
                    <SideNavigation/>
                </nav>
                <main className={styles.content}>
                    {tableElement}
                </main>
            </div>
            <footer className={styles.footer}>
                <Footer/>
            </footer>
        </div>
    );
}

export default Layout;