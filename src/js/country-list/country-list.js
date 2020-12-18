export default class List {
    constructor() {
        this.list = document.querySelector('.list-content');
        this.url = 'https://api.covid19api.com/summary';
        this.urlFlag = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag';
        this.data = null;
    }

    loadInfo() {
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => this.showInfo(json));
    }

    loadFlags() {
        fetch(this.urlFlag)
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    showInfo(json) {
        this.data = json.Countries;
        const dataToShow = this.data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed).reverse();
        dataToShow.forEach(data => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');

            const number = document.createElement('span');
            number.classList.add('number');
            number.innerText = data.TotalConfirmed;

            const country = document.createElement('span');
            country.classList.add('country');
            country.innerText = data.Country;

            listItem.appendChild(number);
            listItem.appendChild(country);
            this.list.appendChild(listItem);
        });
        this.loadFlags();
    }


}
