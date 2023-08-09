import ActionBox from "./action-box";
import featureContent from "../data/feature-content";

const ActionBoxes = () => {
  return (
    <div>
      {featureContent?.map((single, index) => {
        return (
          <div key={index}>
            <ActionBox
              title={single.title}
              content={single.content}
              img={single.image}
              idx={index}
              btnColor={single.btnColor}
              path={single.path}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActionBoxes;
