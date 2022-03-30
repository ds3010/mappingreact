import welcomeImage from "../images/inpixon_indoor.png";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={classes.welcomeMain}>
      <img src={welcomeImage} alt="Inpixon" className={classes.imgClass} />
      <h2 className={classes.welcomeMsg}>
        Welcome to mapping react app, enter valid map credentials above to
        render a Map
      </h2>
    </div>
  );
};

export default WelcomePage;
