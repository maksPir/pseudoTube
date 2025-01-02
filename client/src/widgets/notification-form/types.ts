export const enum TypesNotices {
  Success = 'Успешно!',
  Error = 'Ошибка',
  Info = 'Информация',
}
export interface INoticeFormProps {
  text: string;
  type: TypesNotices;
}
