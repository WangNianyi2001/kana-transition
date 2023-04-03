const r = {
	puct: /、。？！「」『』（）・…/,
	hiragana: /ぁ-ん/,
	katakana: /ァ-ンｧ-ﾝﾞﾟ/,
	kana: /ぁ-んァ-ンｧ-ﾝﾞﾟ/,
	kanji: /一-龯/,

	Any: r => new RegExp(`[${r.source}]`),
};

export class Token {
	src = '';
	/** @type { 'literal' | 'core' | 'particle' } */
	type = 'literal';
	isKana = false;
	stiffness = 0;
	usual = '';
	unusual = '';

	/** @param { string } src */
	constructor(src) {
		this.src = src;

		this.stiffness = /^\**/.exec(src)[0].length;
		src = src.slice(this.stiffness);

		if(r.Any(r.kana).test(src)) {
			this.type = src.includes('(') ? 'core' : 'particle';
			this.isKana = true;
		}

		switch(this.type) {
			default:
				this.usual = this.unusual = src;
				break;
			case 'core':
				const match = /^([^\(]+)\((.*)\)$/.exec(src);
				[, this.usual, this.unusual] = match;
				this.isKana = r.Any(r.kana).test(this.usual);
		}
	}

	Normal() {
		return this.usual;
	}
	
	Kana(force = false) {
		const useKana = force || (this.stiffness == 0);
		let result = this.usual;
		if(useKana && !this.isKana)
			result = this.unusual;
		return result;
	}

	NonKana(stiffness = 0, dropkana = 0) {
		switch(this.type) {
			case 'literal':
				return this.usual;
			case 'particle':
				return dropkana <= 1 - this.stiffness ? this.usual : '';
			case 'core':
				if(!this.isKana)
					return this.usual;
				let result = this.usual;
				if(stiffness >= this.stiffness)
					result = this.isKana ? this.unusual : this.usual;
				return result;
		}
	}
}

class Parser {
	tokenRegex = new RegExp([
		'(',
		[
			/\s+/,
			r.Any(r.puct),
			new RegExp(`\\**[^\\(\\)\\s\\*${r.puct.source}]+(?:\\([^)]*\\))?`),
		].map(r => r.source).join('|'),
		')',
	].join(''));

	/** @param { string } src */
	Parse(src) {
		/** @type { string[] } */
		const tokens = [];
		while(src.length) {
			const match = this.tokenRegex.exec(src);

			if(match == null)
				throw new SyntaxError(src);
			if(match.index !== 0)
				throw new SyntaxError('Index is ' + match.index);
			let token = match?.[0];
			if(token.length === 0)
				throw new SyntaxError('Token length is zero');

			src = src.slice(token.length);

			if(token[0] === ' ')
				token = token.slice(1);
			if(token.length)
				tokens.push(token);
		}
		return tokens.map(src => new Token(src));
	}
}

export default new Parser();