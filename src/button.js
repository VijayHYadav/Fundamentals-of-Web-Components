class Button extends HTMLElement {
    constructor() {
        super();
        // 🚫 const text = this.getAttribute("text");
        // 🚫 this.innerHTML = "hello"
        // 🚫 this.innerHTML = `<button class="btn">${text}</button>`
    }

    connectedCallback() {
        const text = this.getAttribute("text");
        const buttonTemplate = document.querySelector('#button-template');
        this.appendChild(buttonTemplate.content.cloneNode(true));
        this.button = this.querySelector("button");
        this.button.textContent = text;
    }

    set inprogress(progress) {
        if (progress) {
            this.setAttribute("inprogress", "true")
        } else {
            this.removeAttribute("inprogress")
        }
    }

    static get observedAttributes() {
        return ['inprogress']
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        // console.log(attribute, oldValue, newValue);
        // const button = this.querySelector('button');
        if (newValue) {
            this.button.textContent = "Loading...";
            this.button.setAttribute("disabled", "true");
            this.button.classList.add("fading");
        } else {
            this.button.textContent = this.getAttribute("text");
            this.button.removeAttribute("disabled");
            this.button.classList.remove("fading")
        }
    }
}

customElements.define("app-button", Button);
