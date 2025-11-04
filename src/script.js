// Данные из JSON файла
const flightsData = [
   {
      "flightCompany": "NordStar",
      "flightNumber": "Y7 101",
      "isBestPrice": true,
      "isDirect": false,
      "duration": "4 ч 15 мин",
      "departure": {
         "code": "LED",
         "time": "23:20",
         "date": "19 фев. пт."
      },
      "arrival": {
         "code": "DME",
         "time": "07:35",
         "date": "19 фев. пт."
      },
      "family": {
         "luggage": "10кг",
         "baggage": "20кг",
         "return": "платно"
      },
      "Price": 39985
   },
   {
      "flightCompany": "NordStar",
      "flightNumber": "Y7 102",
      "isBestPrice": false,
      "isDirect": true,
      "duration": "4 ч",
      "departure": {
         "code": "LED",
         "time": "22:05",
         "date": "19 фев. пт."
      },
      "arrival": {
         "code": "DME",
         "time": "06:10",
         "date": "19 фев. пт."
      },
      "family": {
         "luggage": "10кг",
         "baggage": "20кг",
         "return": "бесплатно"
      },
      "Price": 40657
   },
   {
      "flightCompany": "NordStar",
      "flightNumber": "Y7 103",
      "isBestPrice": false,
      "isDirect": false,
      "duration": "4 ч",
      "departure": {
         "code": "LED",
         "time": "23:45",
         "date": "19 фев. пт."
      },
      "arrival": {
         "code": "DME",
         "time": "08:00",
         "date": "19 фев. пт."
      },
      "family": {
         "luggage": "10кг",
         "baggage": "20кг",
         "return": "бесплатно"
      },
      "Price": 40657
   },
   {
      "flightCompany": "Aeroflot",
      "flightNumber": "SU 123",
      "isBestPrice": true,
      "isDirect": true,
      "duration": "10 ч",
      "departure": {
         "code": "SVO",
         "time": "13:45",
         "date": "19 фев. пт."
      },
      "arrival": {
         "code": "DME",
         "time": "08:00",
         "date": "19 фев. пт."
      },
      "family": {
         "luggage": "10кг",
         "baggage": "20кг",
         "return": "бесплатно"
      },
      "Price": 45657
   },
   {
      "flightCompany": "S7 Airlines",
      "flightNumber": "S7 456",
      "isBestPrice": false,
      "duration": "4 ч 10 мин",
      "departure": {
         "code": "VKO",
         "time": "18:30",
         "date": "19 фев. пт."
      },
      "arrival": {
         "code": "LED",
         "time": "20:40",
         "date": "19 фев. пт."
      },
      "family": {
         "luggage": "10кг",
         "baggage": "20кг",
         "return": "платно"
      },
      "Price": 38500
      }
];

// Инициализация BootstrapVue
Vue.use(BootstrapVue);

// Директива для анимаций
Vue.directive('animate-css', {
   bind: function (el, binding) {
      const enterAnimation = binding.value.classes
      const duration = binding.value.duration || 1000
      const delay = binding.value.delay || 0

      el.style.animationDuration = duration + 'ms'
      el.style.animationDelay = delay + 'ms'

      el.classList.add('animate__animated')
      el.classList.add('animate__' + enterAnimation)
   }
})

// Компонент карточки рейса
Vue.component('order', {
   props: {
      flight: {
         type: Object,
         required: true
      }
   },
   methods: {
      formatPrice(price) {
         return new Intl.NumberFormat('ru-RU').format(price);
      },
   },
   template: `
      <div class="order d-md-flex flex-nowrap p-1 mb-4 rounded-lg bg-white">
         <div class="order__col">
            <div class="order__header d-flex align-items-center flex-wrap mb-2">
               <div class="order__airline">
                  <div class="airline d-flex align-items-center">
                     <div class="airline__logo d-flex align-items-center justify-content-center rounded-circle">
                        <img src="images/logo-nordstar.png" alt="" width="48" height="48">
                     </div>
                     <div class="airline__name title title--small">{{ flight.flightCompany }}</div>
                  </div>
               </div>
               <div class="order__flight">
                  <div class="badge badge--primary">
                     {{ flight.flightNumber }}
                  </div>
               </div>
               <div class="order__badge" v-if="flight.isBestPrice">
                  <div class="badge badge--highlight">Рекомендованный</div>
               </div>
            </div>
            <div class="order__body d-xl-flex align-items-end font-small m-md-0 mb-5">
               <div class="order__body-main d-flex flex-nowrap m-xl-0 mb-4">
                  <div class="order__timeline order__timeline--departure">
                     <div class="timeline d-flex flex-column">
                        <div class="timeline__time title">{{ flight.departure.time }}</div>
                        <div class="timeline__date date icon-calendar">{{ flight.departure.date }}</div>
                     </div>
                  </div>
                  <div class="order__route">
                     <div class="route d-flex flex-nowrap align-items-end">
                        <div class="route__airport"><strong>{{ flight.departure.code }}</strong></div>
                        <div class="route__duration">В пути {{ flight.duration }}</div>
                        <div class="route__airport"><strong>{{ flight.arrival.code }}</strong></div>
                     </div>
                  </div>
                  <div class="order__timeline order__timeline--arrival">
                     <div class="timeline d-flex flex-column">
                        <div class="timeline__time title">{{ flight.arrival.time }}</div>
                        <div class="timeline__date date icon-calendar">{{ flight.arrival.date }}</div>
                     </div>
                  </div>
               </div>
               <div class="order__body-col d-flex flex-column">
                  <div class="order__info">
                     <div class="info icon-carryon">
                        <strong>Ручная кладь: {{ flight.family.luggage }}</strong>
                     </div>
                  </div>
                  <div class="order__info">
                     <div class="info icon-baggage">
                        <strong>Багаж: {{ flight.family.baggage }}</strong>
                     </div>
                  </div>
                  <div class="order__info">
                     <div class="info icon-return">
                        <strong>Возврат: {{ flight.family.return }}</strong>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="order__col order__footer font-small">
            <div class="order__button mb-2">
               <button class="button button--primary">Выбрать за {{ formatPrice(flight.Price) }} Р</button>
            </div>
            <div class="order__details">Туда и обратно, 1 взрослый</div>
         </div>
      </div>
   `
});

new Vue({
   el: '#app',
   data: {
      sidebarActive: false,
      selectedAirlines: ['nordstar', 'aeroflot'],
      selectedAirports: [],
      flights: [],
      airportSearch: '',
      onlyBestPrice: false,
      onlyDirect: false,
      airlinesCollapseOpen: false,
      airportsCollapseOpen: false,
      route: {
         from: 'Москва',
         to: 'Норильск',
         date: '19 февраля, пт.'
      },
      airlines: [
         { id: 'nordstar', name: 'NordStar' },
         { id: 'aeroflot', name: 'Аэрофлот' },
         { id: 's7airlines', name: 'S7 Airlines' },
      ],
      airports: [
         { code: 'LED', name: 'Пулково' },
         { code: 'DME', name: 'Домодедово' },
         { code: 'SVO', name: 'Шереметьево' },
         { code: 'VKO', name: 'Внуково' },
         { code: 'AER', name: 'Сочи' }
      ],
      
   },
   computed: {
      filteredFlights() {
         let filtered = [...this.flights];
           
         // Фильтрация по лучшей цене
         if (this.onlyBestPrice) {
            filtered = filtered.filter(flight => flight.isBestPrice);
         }

         // Фильтрация по прямому рейсу
         if (this.onlyDirect) {
            filtered = filtered.filter(flight => flight.isDirect);
         }
           
         // Фильтрация по авиакомпаниям
         if (this.selectedAirlines.length > 0) {
            filtered = filtered.filter(flight => 
               this.selectedAirlines.includes(flight.flightCompany.toLowerCase().replace(' ', ''))
            );
         }
           
         return filtered;
      },

      // Поиск аэропортов
      filteredAirports() {
         if (!this.airportSearch) {
           return this.airports;
         }
         const searchTerm = this.airportSearch.toLowerCase().trim();
         return this.airports.filter(airport => 
           airport.name.toLowerCase().includes(searchTerm) || 
           airport.code.toLowerCase().includes(searchTerm)
         );
      }
   },
   methods: {
      toggleSidebar() {
         this.sidebarActive = !this.sidebarActive;
      },

      // Методы для Collapse авиакомпаний
      toggleAirlinesCollapse() {
         this.airlinesCollapseOpen = !this.airlinesCollapseOpen;
      },
      closeAirlinesCollapse() {
         this.airlinesCollapseOpen = false;
      },

      // Методы для Collapse аэропортов
      toggleAirportsCollapse() {
         this.airportsCollapseOpen = !this.airportsCollapseOpen;
      },
      closeAirportsCollapse() {
         this.airportsCollapseOpen = false;
      },
    
      // Выводим карточки
      loadFlightsData() {
         this.flights = flightsData.map((flight, index) => ({
            ...flight,
            id: index + 1
         }));
      },

   },
   mounted() {
      this.loadFlightsData();

      this.filteredAirports = [...this.airports];

      // Закрываем collapse при клике по документу
      document.addEventListener('click', (event) => {
         const airlinesDropdown = document.querySelector('.collapse-dropdown--airline');
         const airportsDropdown = document.querySelector('.collapse-dropdown--airports');
         
         if (airlinesDropdown && !airlinesDropdown.contains(event.target)) {
           this.closeAirlinesCollapse();
         }
         
         if (airportsDropdown && !airportsDropdown.contains(event.target)) {
           this.closeAirportsCollapse();
         }
      });
       
   }
});