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

// Директива для анимаций
Vue.directive('animate-css', {
bind: function (el, binding) {
    const enterAnimation = binding.value.classes
    const duration = binding.value.duration || 1000
    const delay = binding.value.delay || 0

    el.style.animationDuration = duration + 'ms'
    el.style.animationDelay = delay + 'ms'

    // Добавляем классы анимации
    el.classList.add('animate__animated')
    el.classList.add('animate__' + enterAnimation)
}
})

// Компонент карточки рейса
Vue.component('card', {
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
   <div class="card d-sm-flex flex-nowrap p-1 mb-4 rounded-lg bg-white">
      <div class="card__col">
         <div class="card__header d-flex align-items-center mb-2">
            <div class="card__company d-flex align-items-center">
               <div class="card__company-logo d-flex align-items-center justify-content-center rounded-circle">
                  <img src="images/logo-nordstar.png" alt="" width="48" height="48">
               </div>
               <div class="card__company-name title title--small">{{ flight.flightCompany }}</div>
            </div>
            <div class="card__number badge badge--primary">{{ flight.flightNumber }}</div>
            <div class="card__badge badge badge--highlight" v-if="flight.isBestPrice">Рекомендованный</div>
         </div>
         <div class="card__body d-xl-flex align-items-end font-small m-md-0 mb-5">
            <div class="card__body-main m-xl-0 mb-4">
               <div class="card__time-departure title">{{ flight.departure.time }}</div>
               <div class="card__date-departure text-nowrap icon-calendar">{{ flight.departure.date }}</div>
               <div class="card__route d-flex flex-nowrap">
                  <div class="card__code-departure"><strong>{{ flight.departure.code }}</strong></div>
                  <div class="card__duration">В пути {{ flight.duration }}</div>
                  <div class="card__code-arrival"><strong>{{ flight.arrival.code }}</strong></div>
               </div>
               <div class="card__time-arrival title">{{ flight.arrival.time }}</div>
               <div class="card__date-arrival text-nowrap icon-calendar">{{ flight.arrival.date }}</div>
            </div>
            <div class="card__body-col d-flex flex-column">
               <div class="card__luggage icon-carryon">
                  <strong>Ручная кладь: {{ flight.family.luggage }}</strong>
               </div>
               <div class="card__baggage icon-baggage">
                  <strong>Багаж: {{ flight.family.baggage }}</strong>
               </div>
               <div class="card__return icon-return">
                  <strong>Возврат: {{ flight.family.return }}</strong>
               </div>
            </div>
         </div>
      </div>
      <div class="card__col card__footer font-small">
         <div class="card__button mb-2">
            <button class="button button--primary">Выбрать за {{ formatPrice(flight.Price) }} Р</button>
         </div>
         <div class="card__details">Туда и обратно, 1 взрослый</div>
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
      filteredAirports: ['Пулково'],
      flights: [],
      airportSearch: '',
      onlyBestPrice: false,
      onlyDirect: false,
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

         // Фильтрация по аэропортам вылета
         if (this.selectedAirports.length > 0) {
            filtered = filtered.filter(flight => 
               this.selectedAirports.includes(flight.departure.code)
            );
         }
           
         return filtered;
      }
   },
   methods: {
      toggleSidebar() {
         this.sidebarActive = !this.sidebarActive;
      },
      loadFlightsData() {
         this.flights = flightsData.map((flight, index) => ({
            ...flight,
            id: index + 1
         }));
      },
      filterAirports() {
         if (!this.airportSearch) {
            this.filteredAirports = [...this.airports];
            return;
         }
         const searchTerm = this.airportSearch.toLowerCase();
         this.filteredAirports = this.airports.filter(airport => 
            airport.name.toLowerCase().includes(searchTerm) || airport.code.toLowerCase().includes(searchTerm)
         );
      },

   },
   mounted() {
      this.loadFlightsData();

      this.filteredAirports = [...this.airports];
       
      $(document).ready(function() {
         $('.dropdown.keep-open').on({
            "shown.bs.dropdown": function() { $(this).attr('closable', false); },
            "click":             function() { $(this).attr('closable', false); }, // For some reason a click() is sent when Bootstrap tries and fails hide.bs.dropdown
            "hide.bs.dropdown":  function() { return $(this).attr('closable') == 'true'; }
         });
         $('.dropdown.keep-open').children().first().on({
            "click": function() {
               $(this).parent().attr('closable', true );
            }
         });
         $(document).click(function(e) {
            if (!$(e.target).closest('.dropdown').length) {
               $('.dropdown-menu').removeClass('show');
            }
         });
      });
      
       
   }

});
