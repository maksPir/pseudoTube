const db = require('../../db');
const ApiError = require('../../exceptions/api-error');
class FilmService {
  async getFilmById(filmId) {
    const candidate = await db.query(`SELECT * FROM film WHERE id='${filmId}'`);
    if (candidate.rowCount == 0) return false;
    return candidate.rows[0];
  }
  async getFilms() {
    const candidate = await db.query(`SELECT * FROM film`);
    let index = 0;
    for (let item of candidate.rows) {
      await db.query(`UPDATE film set id=${index} where id=${item.id}`);
      index++;
    }
    if (candidate.rowCount == 0) return false;
    return { films: candidate.rows };
  }
  async getRangeFilms(start, count, direction) {
    let sql;
    let rowCount;
    if (Number(direction) === 0) {
      sql = `SELECT * FROM film where id>=${start} order by id`;
    } else {
      sql = `SELECT * FROM film where id<=${start} order by id desc`;
    }
    let candidate = await db.query(sql);
    rowCount = candidate.rowCount;
    if (rowCount >= count && Number(direction)) {
      return { films: candidate.rows.slice(0, count).reverse(), count: rowCount };
    }
    if (rowCount == 0 || rowCount < count) {
      if (rowCount == 0) {
        return false;
      } else {
        if (Number(direction) === 0) {
          sql = `SELECT * FROM film  order by id desc limit ${count} `;
          candidate = await db.query(sql);
          return { films: candidate.rows.reverse(), count: rowCount };
        } else {
          sql = `SELECT * FROM film order by id limit ${count}`;
        }
        candidate = await db.query(sql);
        return { films: candidate.rows, count: rowCount };
      }
    }
    return { films: candidate.rows.slice(0, count), count: rowCount };
  }
  async addFilm(name, desc, rate, img) {
    let sql = `INSERT INTO public.film(
            name, image, rate, description)
            VALUES (${name}, ${img}, ${rate}, ${desc})`;
    try {
      await db.query(sql);
      return { status: 200, message: 'Фильм успешно добавлен' };
    } catch {
      throw ApiError.BadRequestError('Не удалось добавить фильм');
    }
  }
}

module.exports = new FilmService();
