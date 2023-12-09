// Бесконечный паркур





// Примитивы
// Превращает объект (вектор3) в массив
Object.prototype.to_array = function()
{
    return [this.x, this.y, this.z]; 
}

// Прибавление какого-то числа к компонентам вектора
Object.prototype.plus = function(num)
{
    this.x += num; 
    this.y += num; 
    this.z += num; 
}

// Константы
const MAIN_TIMER_INTERVAL = 5; // Интервал генерации паркура

// Константы - структуры
const structure = {
    blocks: {       // Блоки
        pos: [],    // Позиции (трехмерные вектора)
        id: [],     // Айди блока
    },

    new: function(pos, id) // Новая структура
    {
        let result = {};
        Object.assign(result, this);
        result.pos = pos;
        result.id = id;
        return result;
    }
}

const structures = [];

// Функции и объекты
// Трехмерный вектор - точка в пространстве 
const Vector3 = {
    x: 0,
    y: 0,
    z: 0,
    new: function(x, y, z) {return {x: x, y: y, z: z}}
}

// Перевод цвета из HEX строки в цвет в игре
const hex_color = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
    } : null;
}

// Создание структуры из блоков
const generate_struct = function(struct)
{
    struct.blocks.pos.forEach(function(elem, index)
    {
        MapEditor.SetBlock(elem, struct.blocks.id[index]);
    });
}

// Переменные
let last_pos = Properties.GetContext().Get("last_pos"), // Позиция, с которой нужно начинать генерацию новой структуры
    main_timer = Timers.GetContext().Get("main");       // Основной таймер генерации паркура
 
// Настройки
last_pos.Value = Vector3.to_array(); // Задаем стартовую позицию

// Создание команд
Teams.Add("players", "<i><B><size=38>И</size><size=30>гроки</size></B>\nEternal Parcour by just_qstn</i>", hex_color("#9370DB"));
let team = Teams.Get("players");

// Интерфейс и лидерборд

// События

// Таймеры
