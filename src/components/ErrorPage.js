import classes from "./ErrorPage.module.css";
import welcomeImage from "../images/inpixon_indoor.png";

const ErrorPage = () => {
  return (
    <div className={classes.errorMain}>
      <img src={welcomeImage} alt="Inpixon" className={classes.errorImgClass} />
      <h2 className={classes.errorMsg}>
        <span>Error:</span> Could not load the map, please verify credentials
      </h2>
    </div>
  );
};

export default ErrorPage;
