function parseCount(value) {
  const parsed = Number.parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error("Невалидное значение");
  }
  return parsed;
}

function validateCount(value) {
  try {
    return parseCount(value);
  } catch (error) {
    return error;
  }
}

class Triangle {
  constructor(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("Треугольник с такими сторонами не существует");
    }
    this._a = a;
    this._b = b;
    this._c = c;
  }

  get perimeter() {
    return this._a + this._b + this._c;
  }

  get area() {
    const p = this.perimeter / 2;
    const area = Number(Math.sqrt(p * (p - this._a) * (p - this._b) * (p - this._c)).toFixed(3));
    return area;
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch (error) {
    // Возвращаем объект с геттерами, возвращающими строку ошибки
    return {
      get perimeter() {
        return 'Ошибка! Треугольник не существует';
      },
      get area() {
        return 'Ошибка! Треугольник не существует';
      }
    };
  }
}