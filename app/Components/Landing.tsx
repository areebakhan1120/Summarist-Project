"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation"



export default function Landing() {
  const [open, setOpen] = useState(false);
const router = useRouter();



  async function handleLogin(data: { email: string; password: string; remember?: boolean }) {

  setOpen(false);
 
  router.push("/for-you");



}
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>
                <button className="btn home__cta--btn" onClick={() => setOpen(true)}>Login</button>
              </div>
              <figure className="landing__image--mask">
                <img src="/landing.png" alt="landing" />
              </figure>
            </div>
          </div>
          <Modal isOpen={open} onClose={() => setOpen(false)} onSubmit={handleLogin} />
        </div>
      </section>
    </>
  );
}
