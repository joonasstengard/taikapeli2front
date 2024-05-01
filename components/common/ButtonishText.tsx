interface Props {
  buttonText: string;
  disabled?: boolean;
  id?: number;
  onClick: any;
}

export default function ButtonishText({
  buttonText,
  disabled = false,
  id,
  onClick,
}: Props) {
  if (disabled)
    return (
      <>
        <p className="buttonishText">
          {buttonText}
        </p>
        <style jsx>{`
          .buttonishText {
            color:gray;
          }
        `}</style>
      </>
    );
  return (
    <>
      <p className="buttonishText" onClick={() => onClick(id)}>
        {buttonText}
      </p>
      <style jsx>{`
        .buttonishText {
        }
        .buttonishText:hover {
          color: red;
        }
      `}</style>
    </>
  );
}
