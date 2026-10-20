export default function UserWelcome({ user }) {
  if (!user) {
    return (
      <div className="user-status">
        <span className="avatar avatar-muted">?</span>
        <span><strong>Guest mode</strong><small>Register to personalise your visit</small></span>
      </div>
    );
  }

  return (
    <div className="user-status">
      <span className="avatar">{user.name.trim().charAt(0).toUpperCase()}</span>
      <span><strong>Welcome, {user.name.split(' ')[0]}</strong><small>{user.email}</small></span>
    </div>
  );
}
