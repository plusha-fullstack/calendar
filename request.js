// i want to get data though api 
// GET /api/v1/organization/event-calendars HTTP/1.1
//Host: api.lomonosov-msu.ru
//Organization-Token: 05dd3dd84ff948fdae2bc4fb91f13e22bb1f289ceef0037
//Accept: application/json
//    https://api.lomonosov-msu.ru/api/v1/organization/event-calendar/57/events?switch-language=rus&page=1&limit=100
// i need to provide organization-token in heade

// const request = new XMLHttpRequest();
// request.open('GET', 'https://api.lomonosov-msu.ru/api/v1/organization/event-calendar/57/events?switch-language=rus&page=1&limit=100', true);
// request.setRequestHeader('Organization-Token','6483ece6d550dcfd6b56dfc9d45c1d0f78781d9a');       
// request.send();

// curl -X GET --header "Accept: application/json" --header "Organization-Token: 6483ece6d550dcfd6b56dfc9d45c1d0f78781d9a" "https://api.lomonosov-msu.ru/api/v1/organization/event-calendar/57/event/8000/details?switch-language=rus"


// write example of using curl to do api

// Получение данных из API
fetch('https://api.lomonosov-msu.ru/api/v1/organization/event-calendar/57/events?switch-language=rus&page=1&limit=100', {
    method: 'GET',
    headers: {
        'Organization-Token': '6483ece6d550dcfd6b56dfc9d45c1d0f78781d9a',
    }
})
.then(response => response.json())
.then(data => {
    // Получение блока "future-events"
    var futureEventsBlock = document.querySelector('.future-events');

    // Итерация по каждому объекту в массиве данных
    data.forEach(event => {
        // Создание элементов HTML
        var article = document.createElement('article');
        article.className = 'event-card';

        var logoDiv = document.createElement('div');
        logoDiv.className = 'event-card__logo';

        var logoLink = document.createElement('a');
        logoLink.href = 'https://lomonosov-msu.ru/rus/event/' + event.id + '/';
        logoLink.addEventListener('click', function() {
            window.location.href = logoLink.href;
        });

        var logoImg = document.createElement('img');
        logoImg.src = event.logo_url;
        logoImg.alt = event.full_name;

        logoLink.appendChild(logoImg);
        logoDiv.appendChild(logoLink);
        article.appendChild(logoDiv);

        var infoWrapperDiv = document.createElement('div');
        infoWrapperDiv.className = 'event-card__infowrapper';
        infoWrapperDiv.setAttribute('itemscope', '');
        infoWrapperDiv.setAttribute('itemtype', 'http://schema.org/Event');

        var infoDiv = document.createElement('div');
        infoDiv.className = 'event-card__info_future';

        var header = document.createElement('header');
        header.className = 'event-card__header';

        var eventName = document.createElement('h2');
        eventName.className = 'event-card__name event-card__name_future';
        eventName.setAttribute('itemprop', 'name');

        var eventLink = document.createElement('a');
        eventLink.className = 'event-card__link event-card__link_future';
        eventLink.href = 'https://lomonosov-msu.ru/rus/event/' + event.id + '/';
        eventLink.setAttribute('itemprop', 'url');
        eventLink.textContent = event.full_name;
        eventLink.addEventListener('click', function() {
            window.location.href = eventLink.href;
        });

        eventName.appendChild(eventLink);
        header.appendChild(eventName);

        var eventDate = document.createElement('time');
        eventDate.setAttribute('itemprop', 'startDate');
        eventDate.dateTime = event.event_start_date;
        eventDate.textContent = event.event_start_date;

        header.appendChild(eventDate);

        var eventLocation = document.createElement('p');
        eventLocation.className = 'event-card__about event-card__about_future';

        var placeSpan = document.createElement('span');
        placeSpan.className = 'event-card__place';
        placeSpan.setAttribute('itemprop', 'org');
        placeSpan.textContent = event.location;

        eventLocation.appendChild(placeSpan);
        infoDiv.appendChild(header);
        infoDiv.appendChild(eventLocation);
        infoWrapperDiv.appendChild(infoDiv);

        var requestLink = document.createElement('a');
        requestLink.href = 'https://lomonosov-msu.ru/rus/event/' + event.id + '/';
        requestLink.className = 'event-card__btn btn btn-success';
        requestLink.textContent = 'Подать заявку';
        requestLink.addEventListener('click', function() {
            window.location.href = requestLink.href;
        });

        infoWrapperDiv.appendChild(requestLink);
        article.appendChild(infoWrapperDiv);

        // Добавление созданных элементов в блок "future-events"
        futureEventsBlock.appendChild(article);
    });
})
.catch(error => {
    console.error('Ошибка при получении данных из API:', error);
});







//     <article class="event-card">
//     <div class="event-card__logo">
//                     <a href="rus/event/8114/index.html">
//             <img src="media/cache/event_logo/file/event/8114/rus_logo_b756d55de7f57385ab9c696ba20496b6c005802d.jpg" alt="Конференция, посвящённая 100-летию со дня рождения Е. Е. Милановского">
//         </a>
//     </div>
//     <div class="event-card__infowrapper" itemscope itemtype="http://schema.org/Event">
//         <div class="event-card__info_future">
//             <header class="event-card__header">
//                 <h2 class="event-card__name event-card__name_future" itemprop="name">
//                     <a class="event-card__link event-card__link_future" href="rus/event/8114/index.html" itemprop="url">
//                         Конференция, посвящённая 100-летию со дня рождения Е. Е. Милановского
//                     </a>
//                 </h2>
//                                         <time itemprop="startDate" datetime="2023-09-21">21 Сентября 2023</time>
//                                 </header>
//             <p class="event-card__about event-card__about_future">
//                 <span class="event-card__place">
//                                                                         <span itemprop="org">МГУ</span>,
                    
//                                                 <span itemprop="addressCountry">Россия</span>,
                    
//                                                 <span itemprop="addressLocality">Москва</span>
//                                         </span>
//                                         <span class="event-card__regdate">Регистрация:
//                                                         <time>14 Марта 2023</time>
//                                                 </span>
//                                 </p>
//         </div>
//                         <a href="rus/event/request/8114/form.html" class="event-card__btn btn btn-success">
//                 Подать заявку
//             </a>
//                 </div>
// </article>

//curl -X GET \


//  "https://api.lomonosov-msu.ru/api/v2/organization/event-calendar/57/events?switch-language=rus&page=1&limit=100" \
//  -H "Host: api.lomonosov-msu.ru" \
