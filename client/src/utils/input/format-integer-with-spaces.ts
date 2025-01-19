/**
 * Форматирует число, добавляя пробелы в качестве разделителей тысячных разрядов.
 *
 * Функция принимает строку или число в качестве входных данных. Если число содержит
 * десятичную часть, она остается нетронутой, в противном случае только целая часть
 * числа будет отформатирована с добавлением пробела после каждой группы из трех цифр.
 *
 * Пример:
 * - 1234567 -> "1 234 567"
 * - 1234567.89 -> "1 234 567.89"
 *
 * @param value Число или строка, которые требуется отформатировать.
 * @returns Отформатированное число в виде строки с пробелами между тысячными разрядами.
 */

const formatIntegerWithSpaces = (value: string | number) => {
  if (!value) return "";

  const [integer, decimal] = String(value).split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

export default formatIntegerWithSpaces;
