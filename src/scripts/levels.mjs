// import type { Token } from './natr.mjs';

/**
 * @type { { description: string; stringify(tokens: Token[]): string; }[] }
 */
export default [
	{
		description: '只用假名',
		stringify(tokens) {
			return tokens.map(t => t.Kana(true)).join('');
		},
	},
	{
		description: '多用假名',
		stringify(tokens) {
			return tokens.map(t => t.Kana()).join('');
		},
	},
	{
		description: '正常',
		stringify(tokens) {
			return tokens.map(t => t.usual).join('');
		},
	},
	{
		description: '多用常见汉字',
		stringify(tokens) {
			return tokens.map(t => t.NonKana()).join('');
		},
	},
	{
		description: '汉字-1',
		stringify(tokens) {
			return tokens.map(t => t.NonKana(1)).join('');
		},
	},
	{
		description: '汉字-2',
		stringify(tokens) {
			return tokens.map(t => t.NonKana(2)).join('');
		},
	},
	{
		description: '省略不必要的活用',
		stringify(tokens) {
			return tokens.map(t => t.NonKana(2, 1)).join('');
		},
	},
	{
		description: '只用汉字',
		stringify(tokens) {
			return tokens.map(t => t.NonKana(Infinity, 2)).join('');
		},
	},
];