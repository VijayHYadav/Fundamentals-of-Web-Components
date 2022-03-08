const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = /* html */`
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> --> 
    <style>
        /* ::slotted(*) {
            color: black !important;
        } */
        .card {
            border-radius: 5px;
            border: 1px solid var(--line-color, darkgray);
        }
        .card-header {
            padding: 5px;
            background-color: var(--element-bg-color, lightgray);
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            border-bottom: 1px solid var(--line-color, darkgray);
        }
        .card-body {
            padding: 5px;
        }
    </style>
    <div class="card">
        <div class="card-header">
            <!-- Card header will be here -->
            <slot name="card-header">Card Header</slot>
        </div>
        <div part="body-of-card" class="card-body">
            <slot name="card-body">Card Body</slot>
        </div>
    </div>
`;
class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true))
    }
}

customElements.define("app-card", Card);


// setTimeout(() => {
//     customElements.define("app-card", Card);
// }, 2000)
