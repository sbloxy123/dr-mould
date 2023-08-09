const TopicText = ({
  title,
  htmlContent,
}: {
  title: string;
  htmlContent: string;
}) => {
  return (
    <div className="content-container grid grid-cols-10">
      <div className="col-span-3">{title}</div>

      <div
        className="col-span-7"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </div>
  );
};

export default TopicText;
