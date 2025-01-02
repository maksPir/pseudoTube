import './styles.scss';
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        Наши социальные сети:
        <ol>
          VK:{' '}
          <a target="_blank" href="https://vk.com/twsmfu" rel="noreferrer">
            Ссылка
          </a>
        </ol>
        <ol>
          telegram:{' '}
          <a target="_blank" href="https://t.me/maks1m_sS" rel="noreferrer">
            @t.me/maks1m_sS
          </a>
        </ol>
        <ol>
          gitHub:{' '}
          <a target="_blank" href="https://github.com/MaksimPir" rel="noreferrer">
            Ссылка
          </a>
        </ol>
      </div>
      <div className="footer__right">
        Наши партнеры:
        <ol>
          VK:{' '}
          <a target="_blank" href="https://vk.com/twsmfu" rel="noreferrer">
            Ссылка
          </a>
        </ol>
        <ol>
          telegram:{' '}
          <a target="_blank" href="https://t.me/maks1m_sS" rel="noreferrer">
            @t.me/maks1m_sS
          </a>
        </ol>
        <ol>Одноклассники:</ol>
      </div>
    </footer>
  );
};
