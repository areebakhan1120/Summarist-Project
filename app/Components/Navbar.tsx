"use client"

import { useState } from "react";
import Modal from "./Modal";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  async function handleLogin(data: { email: string; password: string; remember?: boolean }) {

    await new Promise((r) => setTimeout(r, 700));
 
  }

  return (
    <div>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/logo.png" alt="logo" />
          </figure>
          <ul className="nav__list--wrapper">
            <li>
              <button className="nav__list nav__list--login" onClick={() => setOpen(true)}>
                Login
              </button>
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <Modal isOpen={open} onClose={() => setOpen(false)} onSubmit={handleLogin} />
    </div>
  );
}
