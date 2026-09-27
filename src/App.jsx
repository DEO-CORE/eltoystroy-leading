import { useEffect, useState } from 'react';
import logoSrc from '../logo.svg';
import drillSrc from '../shrupovert.svg';

const COOKIE_KEY = 'eltoy-cookie-consent';

// All external links are kept here so they can be updated from one place.
const siteLinks = {
  catalog: 'https://www.instagram.com/channel/AbY_S9cSba8ids5B/',
  twoGis: 'https://2gis.kg/bishkek/geo/15763234351090213/74.634582,42.893804',
  yandexMaps: 'https://yandex.ru/maps?whatshere%5Bzoom%5D=17&whatshere%5Bpoint%5D=74.634566,42.893861',
  instagram: 'https://www.instagram.com/eltoy_stroy?stkn=MWJqMDlvcm53Z3J0dA%3D%3D&utm_source=qr',
  facebook: 'https://www.facebook.com/eltoystroy',
  youtube: 'https://youtube.com/@eltoystroy?si=4Hq2h7cS8pVOTJDO',
  tiktok: 'https://www.tiktok.com/@eltoy_stroy?_r=1&_t=ZS-99zkxC9vbtc',
  privacy: '#privacy',
  madeByDeo: 'https://crm.deo-core.codes/forms/61dae79e-1119-4990-8da5-81803404ae28/',
};

const categories = [
  { label: 'Электроинструменты', icon: 'power' },
  { label: 'Бензоинструменты', icon: 'fuel' },
  { label: 'Ручные инструменты', icon: 'tools' },
];

const faqs = [
  {
    question: 'Как оплатить рассрочку MIslamic?',
    answer: (
      <>
        <p>
          Оплатить платежи по рассрочке «Адал» можно через приложение MBANK в разделе MIslamic.
        </p>
        <ol>
          <li>Откройте приложение MBANK на телефоне.</li>
          <li>Перейдите в раздел MIslamic.</li>
          <li>Выберите раздел «Адал рассрочка».</li>
          <li>Выберите покупку, за которую хотите внести платеж.</li>
          <li>Нажмите кнопку «Оплатить».</li>
          <li>Проверьте сумму платежа.</li>
          <li>Подтвердите платеж и убедитесь, что операция прошла успешно.</li>
        </ol>
      </>
    ),
  },
  {
    question: 'Как оплатить рассрочку ZERO?',
    answer: <p>Условия оплаты рассрочки ZERO уточняйте у менеджера.</p>,
  },
];

function Chevron({ direction = 'right' }) {
  return (
    <svg
      className={`icon icon-chevron icon-chevron-${direction}`}
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path d="m4 2.2 3.8 3.8L4 9.8" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6.2-6.2 6.2-11A6.2 6.2 0 0 0 5.8 10c0 4.8 6.2 11 6.2 11Z" />
      <circle cx="12" cy="10" r="2.1" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 3.8 9.6 3l1.7 4-2 1.7a14 14 0 0 0 5.9 5.9l1.7-2 4 1.7-.8 2.4a2.2 2.2 0 0 1-2.4 1.5C10.4 17.2 6.8 13.6 5.7 6.2a2.2 2.2 0 0 1 1.5-2.4Z" />
    </svg>
  );
}

function CategoryIcon({ type }) {
  if (type === 'fuel') {
    return (
      <svg className="category-icon" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 25V8.5A2.5 2.5 0 0 1 10.5 6h7A2.5 2.5 0 0 1 20 8.5V25M8 11h12M11 25h6M20 10h3l2 2v9.2a1.8 1.8 0 0 0 3.5 0V14l-3-3" />
        <path d="M12 16h4M14 14v4" />
      </svg>
    );
  }

  if (type === 'tools') {
    return (
      <svg className="category-icon" viewBox="0 0 32 32" aria-hidden="true">
        <path d="m7 24 7.5-7.5M17 8.5l6.5 6.5M9.2 21.8 6 25l1 1 3.2-3.2M21 6l5 5-2.5 2.5-5-5L21 6Z" />
        <path d="m10 9 3-3 3 3-3 3M22 19l4 4-3 3-4-4" />
      </svg>
    );
  }

  return (
    <svg className="category-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 11h12v10H8zM20 14h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4M12 9V7h4v2M12 23v2h4v-2" />
      <path d="M11 14h4M11 17h6" />
    </svg>
  );
}

function SocialIcon({ type }) {
  if (type === 'facebook') return <span className="social-letter">f</span>;
  if (type === 'instagram') return <span className="social-instagram">◎</span>;
  if (type === 'youtube') return <span className="social-youtube">▶</span>;
  return <span className="social-letter social-tiktok">♪</span>;
}

function Header() {
  const [language, setLanguage] = useState('ru');

  return (
    <header className="site-header">
      <a className="logo-link" href="#home" aria-label="Eltoy Stroy, на главную">
        <img src={logoSrc} alt="Eltoy Stroy" />
      </a>
      <nav className="language-switcher" aria-label="Выбор языка">
        {['ru', 'en', 'kg'].map((item) => (
          <button
            className={language === item ? 'language-button is-active' : 'language-button'}
            key={item}
            type="button"
            aria-pressed={language === item}
            onClick={() => setLanguage(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <h1>
          <span>ELTOY</span> <strong>STROY</strong>
        </h1>
        <p>Больше возможностей для работы. Современная техника и профессиональный инструмент.</p>
        <a className="primary-button" href={siteLinks.catalog} target="_blank" rel="noreferrer">
          перейти в каталог
          <Chevron />
        </a>
      </div>
      <img className="hero-drill" src={drillSrc} alt="Профессиональный шуруповерт Milwaukee" />
    </section>
  );
}

function Categories() {
  return (
    <section className="catalog-section" id="catalog">
      <h2 className="red-heading">Все необходимое для работы</h2>
      <div className="category-list">
        {categories.map((category) => (
          <a className="category-row" href="#contacts" key={category.label}>
            <span className="category-badge">
              <CategoryIcon type={category.icon} />
            </span>
            <span>{category.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={isOpen ? 'faq-item is-open' : 'faq-item'}>
      <button className="faq-trigger" type="button" aria-expanded={isOpen} onClick={onToggle}>
        <span>{item.question}</span>
        <span className="faq-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="faq-answer">{item.answer}</div>}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <h2 className="red-heading">Часто задаваемые вопросы</h2>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <FAQItem
            item={item}
            isOpen={openIndex === index}
            key={item.question}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section className="contacts-section" id="contacts">
      <h2 className="red-heading">Контакты и адреса</h2>
      <div className="contacts-content">
        <div className="contact-lines">
          <p><span>Номер гарантии/ремонт:</span><br />+996 (707) 126-659</p>
          <p><span>Доставка:</span> +996 (707) 126-659<br /><span>Для заказа:</span> +996 (557) 317-007</p>
          <p><span>По поводу рассрочки:</span><br />+996 (702) 623-625</p>
        </div>
        <div className="map-links">
          <a href={siteLinks.twoGis} target="_blank" rel="noreferrer"><PinIcon /> <span>2ГИС</span></a>
          <a href={siteLinks.yandexMaps} target="_blank" rel="noreferrer"><PinIcon /> <span>Яндекс карты</span></a>
        </div>
      </div>
    </section>
  );
}

function Footer({ onOpenPrivacy }) {
  const footerNav = [
    ['Главная', '#home'],
    ['Вопросы', '#faq'],
    ['Контакты', '#contacts'],
  ];
  const socials = [
    ['facebook', siteLinks.facebook, 'Facebook'],
    ['instagram', siteLinks.instagram, 'Instagram'],
    ['youtube', siteLinks.youtube, 'YouTube'],
    ['tiktok', siteLinks.tiktok, 'TikTok'],
  ];

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="footer-logo" href="#home" aria-label="Eltoy Stroy, на главную">
          <img src={logoSrc} alt="Eltoy Stroy" />
        </a>
        <nav className="footer-nav" aria-label="Навигация по сайту">
          <span className="footer-label">Навигация</span>
          {footerNav.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
              <Chevron />
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-details">
        <div className="footer-contact">
          <span className="footer-label">Контакты</span>
          <a className="footer-contact-row" href="tel:+996707126659">
            <PhoneIcon />
            <span>+996 (707) 126-659<br />для заказа</span>
          </a>
          <a className="footer-contact-row" href={siteLinks.twoGis} target="_blank" rel="noreferrer">
            <PinIcon />
            <span>ул. Курманжан Датка, 793</span>
          </a>
        </div>
        <div className="footer-socials">
          <span className="footer-label">Мы в соц сетях</span>
          <div className="social-grid">
            {socials.map(([type, href, label]) => (
              <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} key={type}>
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Eltoy stroy. Все права защищены.</p>
        <button type="button" className="text-link-button" onClick={onOpenPrivacy}>Политика конфиденциальности</button>
        <a
          className="made-by-deo"
          href={siteLinks.madeByDeo}
          target="_blank"
          rel="noreferrer"
          aria-label="Made by DEO"
        >
          <img src="/madebydeo.svg" alt="Made by DEO" />
        </a>
      </div>
    </footer>
  );
}

function CookieBanner({ onAccept, onOpenPrivacy }) {
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent banner">
      <div className="cookie-copy">
        <h3>Мы используем cookies</h3>
        <p>
          Чтобы улучшать работу сайта, сохранять выбранные параметры и делать сервис удобнее.
          <button type="button" className="inline-link" onClick={onOpenPrivacy}>Подробнее в Политике конфиденциальности</button>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="secondary-button" onClick={onOpenPrivacy}>Политика</button>
        <button type="button" className="primary-button cookie-button" onClick={onAccept}>Принять</button>
      </div>
    </div>
  );
}

function PrivacyModal({ onClose }) {
  return (
    <div className="privacy-backdrop" role="dialog" aria-modal="true" aria-label="Политика конфиденциальности">
      <div className="privacy-modal">
        <div className="privacy-header">
          <h2>Политика конфиденциальности</h2>
          <button type="button" className="close-button" onClick={onClose} aria-label="Закрыть">×</button>
        </div>

        <div className="privacy-body">
          <p>
            Мы уважаем вашу конфиденциальность. Вся информация, которую вы предоставляете через сайт,
            используется только для обработки вашего запроса, связи с вами и улучшения качества сервиса.
          </p>
          <p>
            Мы можем собирать данные, такие как имя, номер телефона, адрес электронной почты, а также
            техническую информацию о посещении сайта (например, тип браузера, время посещения, страницы,
            просмотренные на сайте) для аналитики и обеспечения безопасности.
          </p>
          <p>
            Ваши данные не передаются третьим лицам, за исключением случаев, предусмотренных законом,
            а также технологических сервисов, необходимых для корректной работы сайта и обработки заказов.
          </p>
          <p>
            Мы используем cookies для запоминания ваших предпочтений, улучшения навигации и анализа работы
            сайта. Вы можете отключить cookies в настройках браузера, но при этом некоторые функции сайта
            могут работать ограниченно.
          </p>
          <p>
            Вы имеете право в любой момент запросить актуальную информацию о своих данных, попросить их
            изменить, удалить или ограничить обработку, а также отказаться от рассылок.
          </p>
          <p>
            Для этого вы можете связаться с нами по контактам, указанным на сайте, или написать нам через
            форму обратной связи.
          </p>
          <p>
            Мы будем обновлять эту Политику конфиденциальности при необходимости. Актуальная версия всегда
            доступна на этой странице.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return Boolean(window.localStorage.getItem(COOKIE_KEY));
  });
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cookieAccepted) {
        window.localStorage.setItem(COOKIE_KEY, 'accepted');
      } else {
        window.localStorage.removeItem(COOKIE_KEY);
      }
    }
  }, [cookieAccepted]);

  return (
    <>
      <main className="mobile-shell">
        <Header />
        <Hero />
        <Categories />
        <FAQ />
        <Contacts />
        <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />
      </main>

      {!cookieAccepted && (
        <CookieBanner
          onAccept={() => setCookieAccepted(true)}
          onOpenPrivacy={() => setPrivacyOpen(true)}
        />
      )}

      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </>
  );
}
