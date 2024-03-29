Сверстайте табло аэропорта. На нём должны быть представлены следующие данные:

* тип рейса (вылет/прилёт; например это может быть иконка);
* номер рейса;
* авиакомпания;
* логотип авиакомпании;
* тип воздушного судна;
* аэропорт назначения;
* плановое время вылета или прилёта;
* статус рейса (для вылетающих: регистрация, ожидание посадки, посадка закончена, вылетел; для прилетающих: по расписанию, летит, приземлился; для всех: задерживается до HH:MM, отменён);
* примечание (например, информация о код-шеринге с другими авиакомпаниями).

В качестве источника можно использовать данные онлайн-табло любого аэропорта мира.
Дизайн оформления выберите на своё усмотрение, при этом необходимо реализовать следующее:

* по наведению курсора на определённое место в табло контрастным цветом выделяются соответствующие строка и столбец;
* нечётные строки табло темнее чётных;
* количество отображаемых данных по высоте больше ширины экрана, при прокрутке заголовок таблицы приклеивается к верхней части видимой области окна браузера;
* при изменении ширины экрана браузера в табло автоматически скрываются и/или сокращаются значения наименее важных столбцов (например, при ширине 1000 пикселей вы показываете всю таблицу, при ширине 900 пикселей — убираете название авиакомпании, оставляя только логотип, 800 пикселей — сокращаете название воздушного судна (Boeing 737-800 -> B737) и так далее);
* в дополнение к предыдущему пункту сделайте так, чтобы по клику на соответствующую строчку в выплывающем окне показывались все данные рейса;
* два чекбокса над самим табло: прилёт и вылет, по нажатию показываются только соответствующие рейсы.

Плюсом будет, если вам удастся реализовать табло без JavaScript.

Результат пришлите в виде двух ссылок: на работающий пример и на исходный код на GitHub.