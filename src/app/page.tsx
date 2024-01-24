import styles from "@/app/page.module.css";
import SignInButton from "@/components/signInButton";

export default async function Home() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <span className="material-symbols-outlined">light_mode</span>
      </nav>
      <main className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span>Welcome</span>
            <span>to Lite Bite</span>
          </h1>
          <p className={styles.tagline}>
            Get any food from any outlet with ease
          </p>
        </div>
        <SignInButton />
      </main>
    </div>
  );
}
