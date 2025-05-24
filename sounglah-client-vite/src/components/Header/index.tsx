import classes from './Header.module.scss';

export const Header = () => {

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <a href="/">
          <img src="/sounglah-logo.svg" className={classes.image} alt="sounglah" />
          Sounglah
        </a>
      </div>
    </header>
  );
};