// react
import React from 'react'

// css
import './footer.css'
import { MdOutlineEmail } from 'react-icons/md'
import { AiFillGithub } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const getYear = new Date().getFullYear()

  return (
    <div className="footer__wrapper">
      <div className="footer__icons">
        <a
          href="https://mail.google.com/mail/u/1/#inbox?compose=DmwnWrRsnwwHpcFBFlvfqLlwRdKdvrlJcXpBJspGqhsVVxRMrPlPJZjRnLGzwHnrQnCkFHPKLHtl"
          target="_blank"
          rel="noreferrer"
        >
          <MdOutlineEmail className="footer__icons--each" />
        </a>
        <a href="https://github.com/Arianejay" target="_blank" rel="noreferrer">
          <AiFillGithub className="footer__icons--each" />
        </a>
        <a
          href="https://www.linkedin.com/in/ariane-jay-tan-29339b193/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="footer__icons--each" />
        </a>
      </div>
      <div className="footer__rights">
        &#169; Copyright {getYear} <span>Blog it!</span>
      </div>
    </div>
  )
}

export default Footer
