import {createHTML} from '../create-main-html.js';

//ссылка на айпишку из которой надо брать данные за год https://disease.sh/docs/#/COVID-19%3A%20JHUCSSE/get_v3_covid_19_historical 

const createGraph = {
// createFetch(){
//     const API = ''; 

//     fetch(API).then(function(response) {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.blob();
//       })
//         response.json().then(function(data) {  
//             console.log(data);  
//           });    
// },


createButtonForGraph() {
    const graphContentElement = createHTML.getHTMLElementByQuerySelector('.graph-content')

    createHTML.createElementHTML('div', 'graph-btn', graphContentElement, 'graph-btn0')
    createHTML.createElementHTML('div', 'graph-btn', graphContentElement, 'graph-btn1')
    createHTML.createElementHTML('div', 'graph-btn', graphContentElement, 'graph-btn2')
    createHTML.createElementHTML('div', 'graph-btn', graphContentElement, 'graph-btn3')


    const buttonZero = document.getElementById('graph-btn0')
    buttonZero.innerHTML = `<p>Total</p>`
    const buttonOne = document.getElementById('graph-btn1')
    buttonOne.innerHTML = `<p>Active</p>`
    const buttonTwo = document.getElementById('graph-btn2')
    buttonTwo.innerHTML = `<p>Recovere</p>`
    const buttonThree = document.getElementById('graph-btn3')
    buttonThree.innerHTML = `<p>Deaths</p>` 
    
    
    buttonZero.addEventListener(('click'), () => buttonZero.innerHTML = `<p>Today</p>`)
},

createGraphArea(){
    window.onload = () => {
    const ctx = document.querySelector('#graph-canvas').getContext('2d');
    const chartConfig = {
        type: 'bar',
        data: {
            labels: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6", "Task 7", "Task 8", "Task 9", "Task 10"],
            datasets: [],
        },
        options: {
            title: {
                display: true,
                text: 'Results',
            },
            legend: {
                labels: '',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
}

const chart = new Chart(ctx, chartConfig);

    const colorSet = new Set();

    const generateRandomName = () => {
        const length = Math.floor(Math.random() * (8 - 4)) + 4;

        let name = '';

        for (let i = 0; i < length; i += 1) {
            name +=  String.fromCharCode(Math.floor(Math.random() * (122 - 97)) + 97);
        }
        
        return name;
    }

    const generateRandomTime = () => Math.floor(Math.random() * 200);

    // const generateRandomColor = () => {
    //     let color = '#';
        
    //     for (let i = 0; i < 3; i += 1) {
    //         const colorComponent = Math.floor(Math.random() * 255);
    //         color += colorComponent.toString(16);
    //     }

    //     return color;
    // }

    const addUserToChart = (config, setName) => {
        const name = setName || generateRandomName();
        
        const data = Array(10).fill(0).map(() => generateRandomTime());
    
        // do {
        //     color = generateRandomColor();
        // } while (colorSet.has(color));
        // colorSet.add(color);

        const newUser = {
            label: name,
            data: data,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            fill: false,
        }

        config.data.datasets.push(newUser);
        chart.update();
    }

    const removeUserFromChart = ({ data: { datasets } }, name) => {
        if (name) {
            const names = datasets.map(user => user.label);
            const index = names.indexOf(name);
            
            if (index === -1) {
                return;
            }

            datasets.splice(index, 1);
        } else {
            datasets.pop();
        }

        chart.update();
    }

    addUserToChart(chartConfig, 'm');

    document.querySelector('#graph-btn1').addEventListener('click', () => {
        const name = document.querySelector('#graph-btn3').value || null;

        addUserToChart(chartConfig, name);
    });

    document.querySelector('#graph-btn2').addEventListener('click', () => {
        const name = document.querySelector('#graph-btn3').value || null;
        
        removeUserFromChart(chartConfig, name);
    });    
}
}
}

function expansionContentGr() {
    
    const grDiv = document.querySelector('.graph-content')
    createHTML.createElementHTML('div', 'btn-gr-expansion', grDiv, 'expansion-gr')
    const btnTable1 = document.querySelector('.btn-gr-expansion')
    const btnTable = document.querySelector('.map-content')
    const btnGr = document.querySelector('.btn-gr-expansion')
   //const countriesStat = document.getElementById('countries_stat')

    btnGr.addEventListener('click', () => {
    
        grDiv.classList.toggle('expansion-gr');
        btnTable.classList.toggle('none');
        //btnTable1.classList.toggle('z-ind');
 
    })    
}



export default function createGraphInApp() {
    createGraph.createGraphArea();
    createGraph.createButtonForGraph();
    expansionContentGr()
}
