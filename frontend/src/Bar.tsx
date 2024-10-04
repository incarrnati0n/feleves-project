import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Bar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Placeholder name
      </Link>
      <ul>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/reserve">Reserve</CustomLink>
        <CustomLink to="/guestbook">Guestbook</CustomLink>
      </ul>
    </nav>
  );
}

type Props = {
  to: string;
  children: React.ReactNode;
  [key: string]: any;
};

function CustomLink({ to, children, ...props }: Props) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
