export default class List {
    constructor() {
        this.list = document.querySelector('.list-content');
        this.url = 'https://api.covid19api.com/summary';
        this.urlFlag = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag';
        this.data = null;
    }

    loadInfo() {
        fetch('./js/country-list/covid.json')
            .then((response) => response.json())
            // eslint-disable-next-line no-return-assign
            .then((json) => this.data = json.Countries);
        this.loadFlags();
    }

    loadFlags() {
        fetch(this.urlFlag)
            .then((response) => response.json())
            .then((json) => this.showInfo(json));
    }

    showInfo(flags) {
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
            const imageWrapper = document.createElement('div');
            const flag = flags.find((item) => item.name === data.Country);
            if (flag) {
                const image = document.createElement('img');

                imageWrapper.classList.add('country-flag');
                image.onload = () => imageWrapper.appendChild(image);
                image.src = flag.flag;
            }

            listItem.appendChild(number);
            listItem.appendChild(country);
            listItem.appendChild(imageWrapper)
            this.list.appendChild(listItem);
        });

    }


}
