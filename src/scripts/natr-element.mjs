import parser from './parser.mjs';
import levels from './levels.mjs';

class NaTrElement extends HTMLElement {
	#src = '';
	#tokens;
	#levelIndex = 0;
	/** @type { ShadowRoot } */
	#root;
	/** @type { HTMLElement } */
	#content;

	get levelIndex() {
		return this.#levelIndex;
	}
	set levelIndex(value) {
		if(!(value in levels))
			return;
		this.#levelIndex = value;
		this.#Update();
	}

	get level() {
		return levels[this.levelIndex];
	}

	get innerText() {
		return this.#src;
	}
	set innerText(value) {
		try {
			this.#Update();
			this.#src = value;
		}
		catch(e) {
			console.error(e);
		}
	}

	#Update() {
		this.#tokens = parser.Parse(this.#src);
		this.#content.innerText = this.level.stringify(this.#tokens);
	}

	constructor() {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#content = document.createElement('span');
		this.#root.appendChild(this.#content);

		this.innerText = Object
			.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')
			.get.call(this);
	}
}

customElements.define('na-tr', NaTrElement);