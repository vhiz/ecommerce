import { FaFacebook, FaInstagram, FaPinterest, FaXTwitter } from 'react-icons/fa6'


export default function Footer() {
  return (
    <footer className="footer p-3 bg-base-200 lg:p-10 text-base-content">
      <aside className='grid-flow-col lg:grid-flow-row'>
        <img src="/logo.png" alt="" className="lg:w-40 w-20" />
        <p className="lg:text-lg text-xs font-thin w-[85%] lg:w-full">
          Address 1: Yeonsu-gu, Incheon, <br />
          Korean Surabaya St Menteng Central Jakarta City,
          <br /> Indonesia
          <br /> <br />
          Email :pi98contact@gmail.com - Line ID : @pi98contact
        </p>
      </aside>
      <div className="w-full">
        <div className="flex w-full flex-col lg:flex-row items-center gap-3">
          <div className="flex items-center">
            <div className="tooltip" data-tip="Follow us on facebook">
              <button className="btn btn-circle btn-ghost btn-sm">
                <FaFacebook />
              </button>
            </div>
            <div className="tooltip" data-tip="Follow us on X">
              <button className="btn btn-circle btn-ghost btn-sm">
                <FaXTwitter />
              </button>
            </div>
            <div className="tooltip" data-tip="Follow us on instagram">
              <button className="btn btn-circle btn-ghost btn-sm">
                <FaInstagram />
              </button>
            </div>
            <div className="tooltip" data-tip="Follow us on pintrest">
              <button className="btn btn-circle btn-ghost btn-sm">
                <FaPinterest />
              </button>
            </div>
          </div>
          <form className='w-full md:px-2'>
            <fieldset className="form-control w-full md:w-80">
              <div className="md:join flex flex-col justify-center gap-3 w-full">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input md:join-item input-bordered w-full"
                />
                <button className="btn btn-primary md:join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="footer">
          <nav className='menu'>
            <h6 className="footer-title">Services</h6>
            <a className="link-hover link">Branding</a>
            <a className="link-hover link">Design</a>
            <a className="link-hover link">Marketing</a>
            <a className="link-hover link">Advertisement</a>
          </nav>
          <nav className='menu'>
            <h6 className="footer-title">Company</h6>
            <a className="link-hover link">About us</a>
            <a className="link-hover link">Contact</a>
            <a className="link-hover link">Jobs</a>
            <a className="link-hover link">Press kit</a>
          </nav>
          <nav className='menu'>
            <h6 className="footer-title">Legal</h6>
            <a className="link-hover link">Terms of use</a>
            <a className="link-hover link">Privacy policy</a>
            <a className="link-hover link">Cookie policy</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
