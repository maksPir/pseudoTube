import './styles.scss';
export const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer__left">
        <li>
          VK:{' '}
          <a target="_blank" href="https://vk.com/twsmfu" rel="noreferrer">
            Ссылка
          </a>
        </li>
        <li>
          telegram:{' '}
          <a target="_blank" href="https://t.me/maks1m_sS" rel="noreferrer">
            @t.me/maks1m_sS
          </a>
        </li>
        <li>
          gitHub:{' '}
          <a target="_blank" href="https://github.com/MaksimPir" rel="noreferrer">
            Ссылка
          </a>
        </li>
      </ul>
      <ul className="footer__right">
        <li>
          VK:{' '}
          <a target="_blank" href="https://vk.com/twsmfu" rel="noreferrer">
            Ссылка
          </a>
        </li>
        <li>
          telegram:{' '}
          <a target="_blank" href="https://t.me/maks1m_sS" rel="noreferrer">
            @t.me/maks1m_sS
          </a>
        </li>
        <li>Одноклассники:</li>
      </ul>
    </footer>
  );
};
