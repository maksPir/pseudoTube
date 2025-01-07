import { memo, useEffect, useState } from 'react';
import { FilmCard, filmApi } from 'entities/film';
import './style.scss';
import { useInView } from 'react-intersection-observer';
import { IFilm } from 'shared/api';

const SKIP_ITEMS = 2;
// Количество элементов в списке
const COUNT_ITEMS = 6;
const clientHeight = document.documentElement.clientHeight;
const ITEM_HEIGHT = (clientHeight * 40) / 100 + 40;
const COUNT_IN_WINDOW = 3;
interface IFilmProps {
  direction: 0 | 1;
  filmIndex: number;
  count: number | string;
}
interface ICatalogProps {
  isNotOptimizedVer?: boolean;
}
const CatalogToMemo = (props: ICatalogProps) => {
  const [filmPropsState, setFilmPropsState] = useState<IFilmProps>({
    direction: 0,
    filmIndex: 0,
    count: props.isNotOptimizedVer ? 'notOpt' : 30,
  });
  const {
    ref: refUp,
    inView: inViewUp,
    entry: entryUp,
  } = useInView({
    threshold: [0],
    // triggerOnce: true,
    onChange: changedUp,
  });
  const {
    ref: refDown,
    inView: inViewDown,
    entry: entryDown,
  } = useInView({
    threshold: [0.1],
    onChange: changedDown,
  });
  function changedUp(inView: boolean, entry: IntersectionObserverEntry) {
    if (!inView) return;
    // Если первый элемент не отображается
    if (inView && dataFilms?.films && visibleStartIndx + SKIP_ITEMS + COUNT_ITEMS < dataFilms?.films.length) {
      const vArray = dataFilms?.films.slice(visibleStartIndx + SKIP_ITEMS, visibleStartIndx + SKIP_ITEMS + COUNT_ITEMS);
      setVisibleArray(vArray);
      setVisibleStartIndx((prev) => prev + SKIP_ITEMS);
      setCountElemsUp((prev) => prev + SKIP_ITEMS);
      setCountElemsDown((prev) => {
        if (prev - SKIP_ITEMS >= 0) {
          return prev - SKIP_ITEMS;
        }
        return prev;
      });
    }
    if (inView && dataFilms?.films && visibleStartIndx + SKIP_ITEMS + COUNT_ITEMS >= dataFilms?.films.length) {
      const curElem = dataFilms?.films
        ? dataFilms?.films[visibleStartIndx + SKIP_ITEMS]
        : dataFilms?.films[dataFilms?.films.length - 1];
      if (curElem) {
        setFilmPropsState((prev) => ({ ...prev, filmIndex: curElem.id, direction: 0 }));
      }
    }
  }
  function changedDown(inView: boolean, entry: IntersectionObserverEntry) {
    if (!inView) return;
    // Если дошли до самого верха, то изменяем отображаемые элементы
    if (inView && dataFilms?.films && visibleStartIndx - SKIP_ITEMS >= 0) {
      const vArray = dataFilms?.films.slice(visibleStartIndx - SKIP_ITEMS, visibleStartIndx - SKIP_ITEMS + COUNT_ITEMS);
      setVisibleArray(vArray);
      setVisibleStartIndx((prev) => prev - SKIP_ITEMS);
      setCountElemsUp((prev) => {
        return prev - SKIP_ITEMS >= 0 ? prev - SKIP_ITEMS : 0;
      });
      setCountElemsDown((prev) => prev + SKIP_ITEMS);
    }
    if (inView && dataFilms?.films && visibleStartIndx - SKIP_ITEMS < 0 && countElemsUp) {
      // Тут мы только начинаем видеть нулевой элемент
      // Поэтому нужно запрашивать от текущего плюс колво на экране и плюс один
      const curElem = dataFilms?.films ? dataFilms?.films[COUNT_IN_WINDOW - 1] : dataFilms?.films[0];
      if (curElem) {
        setFilmPropsState((prev) => ({ ...prev, filmIndex: curElem.id, direction: 1 }));
        // По идее тут ТРИ
        setCountElemsUp((prev) => {
          return prev - SKIP_ITEMS >= 0 ? prev - SKIP_ITEMS : 0;
        });
        setCountElemsDown((prev) => prev + SKIP_ITEMS);
      }
    }
  }
  const [countElemsUp, setCountElemsUp] = useState(0);
  const [countElemsDown, setCountElemsDown] = useState(0);
  const [visibleStartIndx, setVisibleStartIndx] = useState(0); // Индекс массива, с которого отображать элементы
  const [visibleArray, setVisibleArray] = useState<IFilm[] | undefined>([]); // Отображаемый массив фильмов
  const { data: dataFilms, isFetching } = filmApi.useFetchAllFilmsQuery({
    count: filmPropsState.count,
    main: filmPropsState.filmIndex,
    direction: filmPropsState.direction,
  });
  useEffect(() => {
    if (dataFilms?.films.length) {
      if (props.isNotOptimizedVer) {
        setVisibleArray(dataFilms.films.slice(0, dataFilms.films.length));
        setVisibleStartIndx(0);
      } else if (filmPropsState.direction && dataFilms.films.length - COUNT_ITEMS >= 0) {
        setVisibleArray(
          dataFilms.films.slice(dataFilms.films.length - COUNT_ITEMS - SKIP_ITEMS, dataFilms.films.length)
        );
        setVisibleStartIndx(dataFilms.films.length - COUNT_ITEMS - SKIP_ITEMS);
      } else {
        setVisibleArray(dataFilms.films.slice(0, COUNT_ITEMS));
        setVisibleStartIndx(0);
      }
    }
  }, [dataFilms]);
  return (
    <>
      <section className="catalog">
        <div className="filmList">
          <div id="upPseudoElem" style={{ height: ITEM_HEIGHT * countElemsUp }}></div>
          {visibleArray &&
            visibleArray.map((el, index) => {
              if (index === COUNT_ITEMS - 1 && !props.isNotOptimizedVer) {
                //  countInRow
                return (
                  <div className="filmcard__wrapper" ref={refUp} key={el.id} style={{ backgroundColor: 'red' }}>
                    <FilmCard key={el.id} film={el} />
                  </div>
                );
              }
              if (index === 0 && !props.isNotOptimizedVer) {
                //30-countInRow
                return (
                  <div className="filmcard__wrapper" ref={refDown} key={el.id} style={{ backgroundColor: 'blue' }}>
                    <FilmCard key={el.id} film={el} />
                  </div>
                );
              }
              return (
                <div className="filmcard__wrapper" key={el.id}>
                  <FilmCard key={el.id} film={el} />
                </div>
              );
            })}
          <div id="downPseudoElem" style={{ height: ITEM_HEIGHT * countElemsDown }}></div>
        </div>
      </section>
      {isFetching && <div>Загрузка...</div>}
    </>
  );
};

export const Catalog = memo(CatalogToMemo);
