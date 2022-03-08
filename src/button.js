const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = /* html */`
<style>
    /* host only applied when our component is having shadow root */
    :host {
        display: block;
    }
    :host([inprogress]){
            transform: scale(1.1);
            transform-origin: top left;
        }
    .btn{
        background-color: #0070f3;
        color: white;
        border: none;
        border-radius: 7px;
        padding: 0 2rem;
        font-family: 'Lucida Sans';
        box-shadow: 0 4px 14px 0 rgb(0, 118, 255);
    }
    .btn:hover{
        background-color: #539aec;
    }
    .btn:disabled{
        background-color: #6aa8f0;
    }
    .fading {
        animation: fading 0.5s infinite;
    }

    @keyframes fading {
        0% {
            color: #6aa8f0;
        }
        50% {
            color: white;
        }
        100% {
            color: #6aa8f0;
        }
    }
</style>
<button class="btn"><slot>Fallback value</slot></button>
`

class Button extends HTMLElement {
    constructor() {
        super();
        // 🚫 const text = this.getAttribute("text");
        // 🚫 this.innerHTML = "hello"
        // 🚫 this.innerHTML = `<button class="btn">${text}</button>`
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        // const text = this.getAttribute("text");
        this.initialValue = this.innerHTML;
        this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        // this.button.textContent = text;
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
            this.innerHTML = "Loading...";
            this.button.setAttribute("disabled", "true");
            this.button.classList.add("fading");
        } else {
            // this.button.textContent = this.getAttribute("text");
            this.innerHTML = this.initialValue;
            this.button.removeAttribute("disabled");
            this.button.classList.remove("fading")
        }
    }
}

customElements.define("app-button", Button);

// setTimeout(() => {
//     customElements.define("app-button", Button);
// }, 2000)

