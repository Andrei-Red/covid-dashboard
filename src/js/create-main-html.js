const nameApplication = 'COVID-19 Dashboard';

export const createHTML = {

  createHeaderHtml() {
    const createHeader = () => {
      this.createElementHTML('header', 'wrapper', 'body');
    };

    const createLogo = () => {
      this.createElementHTML('div', 'logo', 'header');
      const logo = this.getHTMLElementByQuerySelector('.logo');
      logo.textContent = nameApplication;
    };

    createHeader();
    createLogo();
  },

  createMainHtml() {
    const createMain = () => {
      this.createElementHTML('main', 'wrapper', 'body', 'main');
    };

    const createListContent = () => {
      this.createElementHTML('div', 'list-content', 'main');
    };

    const createMapContent = () => {
      this.createElementHTML('div', 'map-content', 'main');
    };

    const createTableAndGraphContent = () => {
      this.createElementHTML('div', 'tableGrapg-content', 'main');
    };

    const createTableContent = () => {
      this.createElementHTML('div', 'table-content', '.tableGrapg-content');
    };

    const createGraphContent = () => {
      this.createElementHTML('div', 'graph-content', '.tableGrapg-content');
      this.createElementHTML('canvas', 'graph-area', '.graph-content', 'graph-canvas');
    };

    createMain();
    createListContent();
    createMapContent();
    createTableAndGraphContent();
    createTableContent();
    createGraphContent();
  },

  getHTMLElementByQuerySelector(name) {
    const element = document.querySelector(`${name}`);
    return element;
  },

  createElementHTML(nameElement, nameClass, parentName, id) {
    let parent = null;
    if (typeof (parentName) === 'object') {
      parent = parentName;
    } else if (typeof (parentName) === 'string') {
      parent = this.getHTMLElementByQuerySelector(parentName);
    }

    const element = document.createElement(nameElement);

    if (nameClass) {
      element.classList.add(nameClass);
    }
    if (id) {
      element.id = id;
    }
    parent.appendChild(element);
  },

  createFooterHtml() {
    const createFooter = () => {
      this.createElementHTML('footer', 'wrapper', 'body');
    };

    const createCardFoo = () => {
      for (let i = 0; i < 2; i++) {
        this.createElementHTML('div', 'card-foo', 'footer');
      }

      const arrElemFooterBlock = document.querySelectorAll('.card-foo');

      this.createElementHTML('p', 'card-text', '.card-foo');
      const nameApp = this.getHTMLElementByQuerySelector('.card-text');
      nameApp.textContent = `This is app ${nameApplication}`;



      this.createElementHTML('h5', 'card-title', arrElemFooterBlock[1]);
      const linkAccount = this.getHTMLElementByQuerySelector('.card-title');
      linkAccount.innerHTML = `Created
      <ul>
        <li><a href="https://github.com/kirillstakheyko"> Kirill Stakheyko</a></li>
        <li><a href="https://github.com/koryakovskaya"> Korya Kovskaya</a></li>
        <li><a href="https://github.com/VladlenaVeligan"> Vladlena Veligan</a></li>
        <li><a href="https://github.com/Andrei107Q}"> Andrei Denisenko</a></li>
      </ul>
      `;


      this.createElementHTML('h5', 'card-text', arrElemFooterBlock[0]);
      const cardText = document.querySelectorAll('.card-text')[0];
      cardText.innerHTML = `Created thanks to <a href="https://rs.school/js/">RS School</a>`;
      this.createElementHTML('img', 'imgRS', arrElemFooterBlock[0]);
      const imgCard = this.getHTMLElementByQuerySelector('.imgRS');
      imgCard.src = 'https://rs.school/images/rs_school_js.svg';

    };

    createFooter();
    createCardFoo();
  }
};

export default function startCreteHTML() {
  createHTML.createHeaderHtml();
  createHTML.createMainHtml();
  createHTML.createFooterHtml();
}
