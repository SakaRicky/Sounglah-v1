import classes from './Header.module.scss';
import logo from '@/assets/images/sounglah-logo.svg';

export const Header = () => {

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <a href="/">
          <img src={logo} className={classes.image} alt="sounglah" />
          Sounglah
        </a>
      </div>
    </header>
  );
};