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
    </style>
    <label></label>
    <input>
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

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const label = this.shadowRoot.querySelector("label");
        label.textContent = this.getAttribute("label");
        const input = this.shadowRoot.querySelector("input");
        // Regular event
        // input.addEventListener("input", (event) => {
        //     this.value = event.target.value
        // })
        // custome event
        input.addEventListener("input", (event) => {
            input.dispatchEvent(new CustomEvent('app-input', {
                bubbles: true,
                composed: true,
                detail: event.target.value
            }))
        })
    }
}

customElements.define("app-input", Input);