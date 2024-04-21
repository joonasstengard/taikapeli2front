interface Props {
  buttonText: string;
  id?: number;
  onClick: any;
}

export default function ButtonishText({ buttonText, id, onClick }: Props) {
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
