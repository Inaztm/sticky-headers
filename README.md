
# Липкие панели
Липкие панели на js

[![https://gyazo.com/d781d851b2eb79f39dcf2691beda3e0a](https://i.gyazo.com/d781d851b2eb79f39dcf2691beda3e0a.png)](https://gyazo.com/d781d851b2eb79f39dcf2691beda3e0a)
[![https://gyazo.com/c6ae112484482bce2467770f631139b2](https://i.gyazo.com/c6ae112484482bce2467770f631139b2.png)](https://gyazo.com/c6ae112484482bce2467770f631139b2)

# Примеры
### demo1.html
### demo2.html

# Установка
Подключить скрипт из assets/scripts/stiky.js

```html
<script src="assets/scripts/stiky.js"></script>
```

# Использование

html
```html
<div data-he="one">Test header</div>
<div data-co="one">Test content</div>
<div data-he="two">Test header</div>
<div data-co="two">Test content</div>
```

javaScript
```javascript
var options = {
  header: 'data-he', // Липкие панели
  content: 'data-co', // Контент
  activeClass: 'active-class', // Активный класс, который добавится липкой панели
  tspace: true // Добавлять ли высоту липкой панели к контенту (padding-top)
};
var sticky = new sinaz(options);
```
