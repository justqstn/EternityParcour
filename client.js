try {
    // Бесконечный паркур 
// by just_qstn





// Примитивы
// Превращает объект (вектор3) в массив
Object.prototype.to_array = function()
{
    return [this.x, this.y, this.z]; 
}

// Превращает массив (вектор3) в объект
Array.prototype.to_object = function()
{
    return {x: this[0], y: this[1], z: this[2]};
}

// Операция сложения
Object.prototype.plus = function(vec)
{
    this.x += vec.x; 
    this.y += vec.y; 
    this.z += vec.z; 
}

// Константы
const MAIN_TIMER_INTERVAL = 1, // Интервал генерации паркура
    STRUCT_PER_SECOND = 5;     // Количество генерируемых структур в секунду

// Функции и объекты
// Трехмерный вектор - точка в пространстве 
const Vector3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
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
    try {
        struct.pos.forEach(function(elem, index)
    {
        try {
            MapEditor.SetBlock(new Vector3(0, 0, 0).plus(elem), struct.id[index]); 
        } catch(e) { msg.Show(e.name + " " + e.message);}
    });
    } catch(e) { msg.Show(e.name + " " + e.message);}
}

// Константы - структуры
// Структура
const structure = function (pos, id) {    
    this.pos = pos;   // Позиции (трехмерные вектора). Массив
    this.id = id;     // Айди блока.
}

const structures = [
    new structure([new Vector3(0, 0, 0), new Vector3(4, 0, 0)], [38, 38])
];

// Переменные
let last_pos = Properties.GetContext().Get("last_pos"), // Позиция, с которой нужно начинать генерацию новой структуры
    main_timer = Timers.GetContext().Get("main");       // Основной таймер генерации паркура
 
// Настройки
e = AreaService.Get("start").Ranges.GetEnumerator();
e.moveNext();
last_pos.Value = [e.Current.x, e.Current.y, e.Current.z]; // Задаем стартовую позицию
delete e;

// Создание команд
Teams.Add("players", "<i><B><size=38>И</size><size=30>гроки</size></B>\nEternal Parcour by just_qstn</i>", hex_color("#9370DB"));
let team = Teams.Get("players");

// Интерфейс и лидерборд
LeaderBoard.PlayerLeaderBoardValues = [
	{
		Value: "points",
		DisplayName: "<B>о</B>чки",
		ShortDisplayName: "<B>о</B>чки"
	},
	{
		Value: "record",
		DisplayName: "<B>р</B>екорд",
		ShortDisplayName: "<B>р</B>екорд"
	}
];

Ui.GetContext().TeamProp1.Value = {
	Team: "players", Prop: "hint_left"
};
Ui.GetContext().TeamProp2.Value = {
	Team: "players", Prop: "hint_right"
};

team.Properties.Get("hint_left").Value = "Бета-версия";
team.Properties.Get("hint_right").Value = "by just_qstn";

// События
Teams.OnRequestJoinTeam.Add(function(p, t) {
    t.Add(p);
});

Teams.OnPlayerChangeTeam.Add(function(p) {
    p.Spawns.Spawn();
});

// Таймеры
main_timer.OnTimer.Add(function() {
    if (STRUCT_PER_SECOND > 1)
    {
        for (let i = 0; i < STRUCT_PER_SECOND; i++)
        {
            generate_struct(structures[Math.floor(Math.random() * (structures.length - 1))]);
        }
    }
    else
    {
        generate_struct(structures[Math.floor(Math.random() * (structures.length - 1))]);
    }
});

main_timer.RestartLoop(MAIN_TIMER_INTERVAL);
} catch(e) { Validate.ReportInvalid(e.name + " " + e.message);}
