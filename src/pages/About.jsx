import { Link } from '../components/Link';

// Adding internalization.
const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Creando un clon de React Router',
    homeLink: 'Inicio',
  },
  en: {
    title: 'About us',
    description: 'Creating a clone of React Router',
    homeLink: 'Home',
  },
};

// Custom hook to select the language.
const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function AboutPage({ routeParams }) {
  const { lang } = routeParams;
  const { title, description, homeLink } = useI18n(lang);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          gap: '25px',
        }}
      >
        <Link destination={'/en/about/'}>English</Link>
        <Link destination={'/es/about/'}>Español</Link>
      </div>

      <h1>{title}</h1>
      <p>{description}</p>
      <Link destination={'/'}>{homeLink}</Link>
    </>
  );
}
