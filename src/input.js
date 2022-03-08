const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
    label {
        display: block;
    }
    input {
        min-width: 200px;
        border-radius: 3px;
        border: 1px solid lightgray;
        padding: 10px;
    }
    span {
        font-size: 0.8rem;
        display: none;
    }
    :host([validation="invalid"]) span {
        display: block;
        color: red;
    }
    :host([validation="invalid"]) input {
        border-color: red;
    }
    :host([validation="valid"]) span {
        display: block;
        color: green;
    }
    :host([validation="valid"]) input {
        border-color: green;
    }
    </style>
    <label></label>
    <input>
    <span>Message</span>
`

class Input extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    set value(value){
        console.log("set value")
        this.setAttribute("value", value)
    }

    get value() {
        console.log("get value")
        return this.getAttribute("value")
    }

    get help() {
        return this.getAttribute("help");
    }

    set help(help){
        this.setAttribute("help", help);
    }

    get validation() {
        return this.getAttribute("validation");
    }

    set validation(validation) {
        this.setAttribute("validation", validation)
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const label = this.shadowRoot.querySelector("label");
        label.textContent = this.getAttribute("label");
        const input = this.shadowRoot.querySelector("input");
        input.type = this.getAttribute("type")
        this.span = this.shadowRoot.querySelector("span");
        this.span.textContent = this.getAttribute("help");

        input.addEventListener("input", (event) => {
            input.dispatchEvent(new CustomEvent('app-input', {
                bubbles: true,
                composed: true,
                detail: event.target.value
            }))
        })
    }

    static get observedAttributes() {
        return ["help"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        this.span.textContent = newValue;   
    }
}

customElements.define("app-input", Input);