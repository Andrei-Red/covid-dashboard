
import Keyboard from './keyboard.js';

export default class List {
    constructor() {
        this.list = document.querySelector('.list-content');
        this.url = 'https://corona.lmao.ninja/v2/countries';
        this.data = null;
        this.dataToShow = null;
        this.controlPanel = null;
        this.dataPanel = null;
        this.param = null;
        this.width = null;
        this.height = null;
    }

    loadInfo() {
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => this.saveInfo(json))
    }

    saveInfo(json) {
        this.data = json;
        this.dataToShow = this.data;
        this.param = 'cases';
        this.sortInfo(this.param);
        this.renderListPanel();
        this.showInfo(this.param);
    }

    sortInfo(param) {
        this.dataToShow = this.dataToShow.sort((a, b) => a[param] > b[param] ? 1 : -1).reverse();
    }

    searchInfo(request) {
        this.dataToShow = this.data.filter((country) => country
            .country.substr(0, request.length).toLowerCase() === request.toLowerCase());
    }

    renderListPanel() {
        this.list.innerHTML = '';
        this.controlPanel = document.createElement('div');
        this.controlPanel.classList.add('control-panel');
        this.dataPanel = document.createElement('div');
        const searchField = document.createElement('input');
        searchField.classList.add('use-keyboard-input')
        searchField.type = 'text';
        searchField.placeholder = 'input country'
        this.controlPanel.appendChild(searchField);
        searchField.oninput = () => {
            this.searchInfo(searchField.value);
            this.showInfo(this.param);
        };
        this.controlPanel.appendChild(this.renderSelect());
        this.controlPanel.appendChild(this.renderFull());


        this.list.append(this.controlPanel, this.dataPanel);
        Keyboard.start();
    }

    renderFull() {
        const fullBtn = document.createElement('img');
        fullBtn.onload = () => this.controlPanel.appendChild(fullBtn);
        fullBtn.src = './assets/fullscreen1.jpg';
        fullBtn.onclick = () => {
            if (this.list.classList.contains('list-content-full')) {
                this.list.classList.remove('list-content-full')
                this.list.style.width = '18%'
                this.list.style.height = '100%'


            } else {
                this.list.classList.add('list-content-full')
                this.list.style.width = document.querySelector('.wrapper').clientWidth + 'px';
                this.list.style.height = document.querySelector('#main').clientHeight + 'px';
            }
        }
        return fullBtn;
    }

    renderSelect() {
        const select = document.createElement('select');
        select.append(new Option('All cases', 'cases'))
        select.append(new Option('All deaths', 'deaths'))
        select.append(new Option('All recovered', 'recovered'))
        select.append(new Option('Today Cases', 'todayCases'))
        select.append(new Option('Today Deaths', 'todayDeaths'))
        select.append(new Option('Today Recovered', 'todayRecovered'))
        select.append(new Option('Cases per 100k', 'casesPerOneMillion'))
        select.append(new Option('Deaths per 100k', 'deathsPerOneMillion'))
        select.append(new Option('Recoveres per 100k', 'recoveredPerOneMillion'))
        // select.append(new Option('All recovered', 'recovered'))
        // select.append(new Option('All recovered', 'recovered'))
        // select.append(new Option('All recovered', 'recovered'))
        select.addEventListener('change', (e) => {
            this.param = e.target.value;
            this.sortInfo(this.param);
            this.showInfo(this.param);
        })
        return select;
    }

    showInfo(param) {
        this.dataPanel.innerHTML = '';
        this.dataToShow.forEach(data => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');

            const number = document.createElement('span');
            number.classList.add('number');
            number.innerText = data[param];

            const country = document.createElement('span');
            country.classList.add('country');
            country.innerText = data.country;
            const imageWrapper = document.createElement('div');

            const image = document.createElement('img');

            imageWrapper.classList.add('country-flag');
            image.onload = () => imageWrapper.appendChild(image);
            image.src = data.countryInfo.flag;
            if (data.country === "Belarus") {
                image.src = 'https://i.pinimg.com/originals/b9/80/25/b9802529987910b4a8e4eea576b064ca.png'
            }
            listItem.append(number, country, imageWrapper);
            this.dataPanel.appendChild(listItem);
        });
    }
}
