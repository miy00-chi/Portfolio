import { useEffect, useRef, useState } from "react";

const languages = ["HTML / CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git", "TypeScript"];
const tools = ["Figma", "Adobe Photoshop", "Krita", "VS Code", "Canva"];

const developmentProjects = [
  {
    name: "BioSnap: Biodiversity Inventory System",
    role: "Project Manager | QA | Backend Developer",
    description:
      "A web and mobile biodiversity inventory system that uses image recognition to identify plant and animal species. Citizens can submit observations for staff verification before they enter the official inventory.",
    image: "/assets/projects/development/biosnap.png",
    imageAlt: "BioSnap biodiversity inventory system home page",
    liveUrl: "https://biosnapph.site",
    techStack: ["TypeScript", "React Native", "Firebase", "Next.js"],
  },
  {
    name: "Coconoir: E-Commerce Store",
    role: "Full-Stack Developer",
    description:
      "An e-commerce website for sustainable coconut coir products, with product browsing, user accounts, shopping cart and checkout, order tracking, and seller inventory tools.",
    image: "/assets/projects/development/coconoir.png",
    imageAlt: "Coconoir sustainable coconut coir e-commerce home page",
    techStack: ["MySQL", "Gmail SMTP", "JavaScript", "Next.js"],
  },
  {
    name: "ITSO Equipment Management System",
    role: "Project Manager | QA | Backend Developer",
    description:
      "An equipment management dashboard for tracking inventory, availability, borrow requests, returns, and maintenance for the ITSO office.",
    image: "/assets/projects/development/itso.png",
    imageAlt: "ITSO equipment management system dashboard",
    techStack: ["PHP", "HTML & CSS", "JavaScript", "MySQL", "Bootstrap", "CodeIgniter 4"],
  },
];

const uiUxProjects = [
  {
    name: "MystiPOP: Blind Box E-Commerce App",
    role: "UI/UX Designer",
    description:
      "An academic mobile app concept that gives blind box collectors a trusted space to buy, sell, and trade figures, designed around core UI/UX principles for a Human-Computer Interaction course.",
    screens: [
      { src: "/assets/projects/ui_ux/mystipop1.png", alt: "MystiPOP home screen" },
      { src: "/assets/projects/ui_ux/mystipop2.png", alt: "MystiPOP product screen" },
      { src: "/assets/projects/ui_ux/mystipop3.png", alt: "MystiPOP checkout screen" },
    ],
    wireframeUrl: "https://www.figma.com/design/mBiNd95KvWKIG1HrAyOc4R/Blindbox-App---Ecommerce-Application?node-id=73-75&t=uogyzqKh9PE9EGUw-1",
  },
  {
    name: "SafeRx: Medicine Safety & Health Companion App",
    role: "UI/UX Designer",
    description:
      "An academic mobile app concept for verifying medicines, tracking intake, finding nearby pharmacies, and consulting doctors online. It supports the UN Sustainable Development Goal 3: Good Health and Well-Being.",
    screens: [
      { src: "/assets/projects/ui_ux/saferx1.png", alt: "SafeRx dashboard screen" },
      { src: "/assets/projects/ui_ux/saferx2.png", alt: "SafeRx pharmacy screen" },
      { src: "/assets/projects/ui_ux/saferx3.png", alt: "SafeRx appointment screen" },
    ],
    wireframeUrl: "https://www.figma.com/design/caHexaBAMC94Xe35QSKoUB/Safe-Rx-Prototype1_AsclepiusMedica_TW23-BSITWMA?node-id=25-41&t=xreGWl1uTYkdl21V-1",
  },
];

const graphicDesigns = [
  { label: "Character illustration, April 30, 2024", src: "/assets/projects/graphicdesign/4.30.2024.jpg", layout: "art430" },
  { label: "Blue character illustration, March 25, 2024", src: "/assets/projects/graphicdesign/3.25.2024.jpg", layout: "art325" },
  { label: "Portrait illustration, February 7, 2024", src: "/assets/projects/graphicdesign/2.7.2024.jpg", layout: "art207" },
  { label: "Flora & Fauna information poster", src: "/assets/projects/graphicdesign/infographics.jpg", layout: "flora" },
  { label: "Rewired event poster", src: "/assets/projects/graphicdesign/wmaPoster.png", layout: "rewired" },
  { label: "ICAF 21 event banner", src: "/assets/projects/graphicdesign/ticaplogo.png", layout: "banner" },
  { label: "Gender equality poster", src: "/assets/projects/graphicdesign/researchPoster.png", layout: "gender" },
  { label: "ICAF 21 logo", src: "/assets/projects/graphicdesign/capstonelogo.png", layout: "capstone" },
  { label: "Event identity artwork", src: "/assets/projects/graphicdesign/logoproposal.png", layout: "event" },
];

function ProjectImage({ src, label, className = "", onViewImage }) {
  if (src) {
    return (
      <button
        className={`project-image-frame ${className}`}
        type="button"
        aria-label={`View ${label} larger`}
        onClick={() => onViewImage({ src, label })}
      >
        <img className="project-image" src={src} alt={label} />
      </button>
    );
  }

  return (
    <div
      className={`project-image-placeholder ${className}`}
      role="img"
      aria-label={`${label} image placeholder`}
    >
      <span>{label}</span>
    </div>
  );
}

function ProjectImageViewer({ image, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="project-image-viewer"
      aria-label={`${image.label} enlarged image`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="project-image-viewer-close"
        type="button"
        aria-label="Close image"
        onClick={onClose}
        autoFocus
      >
        [x]
      </button>
      <figure className="project-image-viewer-content">
        <img src={image.src} alt={image.label} />
        <figcaption>{image.label}</figcaption>
      </figure>
    </dialog>
  );
}

function ProjectTags({ tags }) {
  return (
    <div className="project-tags">
      {tags.map((tag) => (
        <span className="project-tag" key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function LanguagesAndTools() {
  return (
    <section className="projects-section languages-tools-section" aria-labelledby="languages-tools-heading">
      <div className="languages-tools-grid">
        <div>
          <h3 className="projects-subheading">Languages</h3>
          <ProjectTags tags={languages} />
        </div>
        <div>
          <h3 className="projects-subheading">Tools</h3>
          <ProjectTags tags={tools} />
        </div>
      </div>
    </section>
  );
}

function DevelopmentProjects({ onViewImage }) {
  return (
    <section className="projects-section" aria-labelledby="development-projects-heading">
      <h2 className="projects-heading" id="development-projects-heading">Development Projects</h2>
      <div className="development-project-list">
        {developmentProjects.map((project) => (
          <article className="development-project" key={project.name}>
            <ProjectImage
              src={project.image}
              label={project.imageAlt}
              className="development-image"
              onViewImage={onViewImage}
            />
            <div className="project-details">
              <h3 className="project-title">
                {project.liveUrl ? (
                  <a
                    className="project-title-link"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <ProjectTags tags={project.techStack} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function UiUxDesign({ onViewImage }) {
  return (
    <section className="projects-section" aria-labelledby="uiux-heading">
      <h2 className="projects-heading" id="uiux-heading">UI/UX Design</h2>
      <div className="uiux-project-list">
        {uiUxProjects.map((project) => (
          <article className="uiux-project" key={project.name}>
            <div className="uiux-image-gallery" aria-label={`${project.name} screen previews`}>
              {project.screens.map(({ src, alt }) => (
                <ProjectImage
                  src={src}
                  label={alt}
                  className="uiux-image"
                  key={src}
                  onViewImage={onViewImage}
                />
              ))}
            </div>
            <div className="project-details uiux-project-details">
              <h3 className="project-title">{project.name}</h3>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <a
                className="project-action-button"
                href={project.wireframeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit Wireframe
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GraphicDesigns({ onViewImage }) {
  return (
    <section className="projects-section" aria-labelledby="graphic-designs-heading">
      <h2 className="projects-heading" id="graphic-designs-heading">Graphic Designs</h2>
      <div className="graphic-design-gallery">
        {graphicDesigns.map(({ label, src, layout }) => (
          <ProjectImage
            src={src}
            label={label}
            className={`graphic-design-image graphic-design-image-${layout}`}
            key={label}
            onViewImage={onViewImage}
          />
        ))}
      </div>
    </section>
  );
}

export default function ProjectsContent() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="projects-content">
      <LanguagesAndTools />
      <DevelopmentProjects onViewImage={setSelectedImage} />
      <UiUxDesign onViewImage={setSelectedImage} />
      <GraphicDesigns onViewImage={setSelectedImage} />
      {selectedImage && (
        <ProjectImageViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
