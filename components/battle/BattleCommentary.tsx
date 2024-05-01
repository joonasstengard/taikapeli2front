import type Battle from "../../types/Battle";

interface Props {
  commentaryLastLine: string;
}

export default function BattleCommentary({ commentaryLastLine }: Props) {
  return (
    <div className="commentary-container">
      <p>{commentaryLastLine}</p>
      <style jsx>{`
        .commentary-container {
          background-color: #212121;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
