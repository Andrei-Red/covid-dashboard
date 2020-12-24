  
import {createHTML} from '../create-main-html.js';

const createTable = {

    createBoxes() {
        const boxesElements = createHTML.getHTMLElementByQuerySelector('.table-content');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'total_cases-text');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'total_cases');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'total_death-text');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'total_death');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'global_recovery-text');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'global_recovery');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'sick_today-text');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'sick_today');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'deaths_today-text');
        createHTML.createElementHTML('div', 'world-statistic', boxesElements, 'deaths_today');

        const total_cases_text = document.getElementById('total_cases-text');
        total_cases_text.innerHTML = `<h3>Global cases</h3>`;
        const total_cases = document.getElementById('total_cases');
        total_cases.innerHTML = `<h4> </h4>`;
        const total_death_text = document.getElementById('total_death-text');
        total_death_text.innerHTML = `<h3>Total deaths</h3>`;
        const total_death = document.getElementById('total_death');
        total_death.innerHTML = `<h4> </h4>`;
        const global_recovery_text = document.getElementById('global_recovery-text');
        global_recovery_text.innerHTML = `<h3>Global recovery</h3>`;
        const total_recovered = document.getElementById('global_recovery');
        total_recovered.innerHTML = `<h4> </h4>`;
        const new_cases_text = document.getElementById('sick_today-text');
        new_cases_text.innerHTML = `<h3>Got sick today</h3>`;
        const new_cases = document.getElementById('sick_today');
        new_cases.innerHTML = `<h4> </h4>`;
        const deaths_today_text = document.getElementById('deaths_today-text');
        deaths_today_text.innerHTML = `<h3>Deaths today</h3>`;
        const new_death = document.getElementById('deaths_today');
        new_death.innerHTML = `<h4> </h4>`;

        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "bcc93bfd73msh44b00a724a0e158p14e693jsna9192b86aa01"
        }
    })
        .then(response => response.json().then( data => {
        total_cases.innerHTML = data.total_cases;
        total_death.innerHTML = data.total_deaths;
        total_recovered.innerHTML = data.total_recovered;
        new_cases.innerHTML = data.new_cases;
        new_death.innerHTML = data.new_deaths;
    })).catch(err => {
        console.log(err);
    });

    },

createTableContent() {
    const boxesElements = createHTML.getHTMLElementByQuerySelector('.table-content');
    createHTML.createElementHTML('div', 'table-statistic', boxesElements, 'table-content-countries');
    const totalCountryStat = document.getElementById('table-content-countries');

    boxesElements.insertAdjacentHTML('beforeend',
    `
    <table id="countries_stat">
        <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
            <th>Case today</th>
            <th>Death Today</th>
        </tr>
    </table>
    `)

    let table = document.getElementById('countries_stat');
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "bcc93bfd73msh44b00a724a0e158p14e693jsna9192b86aa01"
    }
})
    .then(response => response.json().then(data =>{

        let countries_stat = data.countries_stat;

        for(let i = 0; i<countries_stat.length;i++){

        let row = table.insertRow(i+1);
        let country_name = row.insertCell(0);
        let cases = row.insertCell(1);
        let deaths = row.insertCell(2);
        let recovered_per_country = row.insertCell(3);
        let new_cases = row.insertCell(4);
        let new_deaths = row.insertCell(5);
        country_name.innerHTML = countries_stat[i].country_name;
        cases.innerHTML = countries_stat[i].cases;
        deaths.innerHTML = countries_stat[i].deaths;
        recovered_per_country.innerHTML = countries_stat[i].total_recovered; 
        new_cases.innerHTML = countries_stat[i].new_cases; 
        new_deaths.innerHTML = countries_stat[i].new_deaths;

    }



}))
.catch(err => {
    console.log(err);
});
    }
}

function expansionContentTab() {
    
    const tabDiv = document.querySelector('.table-content')
    createHTML.createElementHTML('div', 'btn-tab-expansion', tabDiv, 'expansion-tab')
    const btnTable2 = document.querySelector('.btn-tab-expansion')
  

    const btnTable = document.querySelector('.map-content')
    const btnGr = document.querySelector('.btn-gr-expansion')
    const countriesStat = document.getElementById('countries_stat')

   btnTable2.addEventListener('click', () => {
    
        tabDiv.classList.toggle('expansion-tab');
        btnTable.classList.toggle('none');
        btnTable.classList.toggle('z-ind');
       
        countriesStat.classList.toggle('table-center');
    })    
}


export default function createTableInApp() {
    createTable.createBoxes();
    createTable.createTableContent();
    expansionContentTab()
}



//countries_stat
//const infoTable = document.querySelector('.info')





