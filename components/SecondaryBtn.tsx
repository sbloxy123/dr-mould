import "../css/secondaryBtn.css";

const SecondaryBtn = ({
  label,
  btnColor,
}: {
  label: string;
  btnColor: string;
}) => {
  return (
    <div>
      <div className="learn-more-link">
        <div className={`text-theme_white-900 button__text`}>{label}</div>

        <div className="button__wrapper">
          <div
            className={`bg-${btnColor} after:border-l-8 after:border-l-${btnColor} after:border-solid button__arrow`}
          ></div>
          <div className="button__border-circle"></div>
          <div className="button__mask-circle">
            <div className={`bg-${btnColor} button__small-circle`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryBtn;
