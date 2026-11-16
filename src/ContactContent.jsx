const contactEmail = "hazelmito2029@gmail.com";
const contactHref = `mailto:${contactEmail}?subject=Portfolio%20inquiry`;

export default function ContactContent() {
  return (
    <section className="contact-content" aria-labelledby="contact-heading">
      <h1 className="contact-heading" id="contact-heading">omg mail!!</h1>
      <p className="contact-intro">the best way to contact me is through email!</p>
      <img
        className="contact-drawing-placeholder"
        src="/assets/img/email.png"
        alt="Illustration of a person holding an envelope"
      />
      <p className="contact-email">
        email me at: <a href={contactHref}>{contactEmail}</a>
      </p>
    </section>
  );
}
