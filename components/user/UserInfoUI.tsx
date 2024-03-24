import User from '../../types/User';

interface Props {
    user: User;
}

export default function UserInfoUI
    ({ user }: Props) {
    return (
        <div className="gold-count">
            <p><b>{user?.username}</b></p>
            <p>Gold: {user?.gold}</p>
        </div>
    );
}
