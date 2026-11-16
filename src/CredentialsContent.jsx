const credentials = [
  {
    title: "PMI Project Management Ready",
    subtitle: "PMI 2026",
    image: "PMI.png",
    verifyUrl: "https://www.credly.com/earner/earned/badge/e3d69bbf-6052-4b2b-9ae8-1512bcadfaeb",
  },
  {
    title: "Cisco Certified Support Technician Networking",
    subtitle: "Cisco, 2025, lifetime",
    image: "ciscotechnet.png",
    verifyUrl: "https://www.credly.com/earner/earned/badge/4f90f93c-cff2-44bd-b5a6-1488341f8c71",
  },
  {
    title: "CCNA: Enterprise Networking, Security, and Automation",
    subtitle: "Cisco",
    image: "ccnaEnterprise.png",
    verifyUrl: "https://www.credly.com/earner/earned/badge/569628de-129e-49e8-b7d3-79d2419ba890",
  },
  {
    title: "Linux Essentials",
    subtitle: "Cisco",
    image: "linux.png",
    verifyUrl: "https://www.credly.com/earner/earned/badge/998471a4-8341-459f-862a-097505735ef4",
  },
  {
    title: "DevNet Associate",
    subtitle: "Cisco",
    image: "devnet'.png",
    verifyUrl: "https://www.credly.com/earner/earned/badge/bf9e6b03-f0ed-4c8e-8ae7-a36bcb06d90f",
  },
];

function handleVerifyHover() {
  // Add the credential hover sound here when it is ready.
}

export default function CredentialsContent() {
  return (
    <div className="credentials-content">
      <ul className="credentials-list">
        {credentials.map(({ title, subtitle, image, verifyUrl }) => (
          <li className="credential-item" key={title}>
            <img
              className="credential-logo"
              src={`/assets/certificates/${image}`}
              alt={`${title} certificate logo`}
            />
            <div className="credential-details">
              <h2 className="credential-title">{title}</h2>
              <p className="credential-subtitle">{subtitle}</p>
              <a
                className="credential-verify-button"
                href={verifyUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleVerifyHover}
              >
                Verify
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
