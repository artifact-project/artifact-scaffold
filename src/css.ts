interface ComputedRule {
	used: boolean;
	name: string;
	cssText: string;
	tags: string[];
}

interface ComputedRules {
	[computedName: string]: ComputedRule;
}

const R_TAG = /^<(.+)\/>$/;
const R_UPPER = /[A-Z]/;

const SEED = Math.round(Math.random() * 1e6);
const registry: ComputedRules = {};

function simpleChecksum(value: string): string {
	let idx = value.length;
	let hash = SEED;

	while (idx--) {
		hash = (hash * 33) ^ value.charCodeAt(idx);
	}

	return (hash >>> 0).toString(36);
}

function computeCSSPropValue(name, value) {
	if (value >= 0 || value <= 0) {
		value += 'px';
	}

	return value;
}

function toKebabCase(chr) {
	return `-${chr.toLowerCase()}`;
}

function computeCSSPropName(name) {
	return name.replace(R_UPPER, toKebabCase);
}

function computeCSS(rule) {
	const props = [];

	Object.keys(rule).forEach(prop => {
		props.push(`${computeCSSPropName(prop)}:${computeCSSPropValue(prop, rule[prop])}`);
	});

	return props.join(';\n');
}

function computeRule(name: string, rule: any): ComputedRule {
	const cssText = computeCSS(rule);
	const computedName = `_${simpleChecksum(cssText)}`;

	if (!registry.hasOwnProperty(computedName)) {
		registry[computedName] = {
			used: false,
			name: computedName,
			tags: [],
			cssText,
		};
	}

	return registry[computedName];
}

function useRule(rule: ComputedRule, tagName?: string) {
	rule.used = true;
	tagName && rule.tags.push(tagName);
}

function isRuleForTag(name) {
	return R_TAG.test(name);
}

export function getUsedCSS() {
	return Object
		.keys(registry)
		.map(name => {
			const {used, cssText, tags} = registry[name];

			return used
				? `\n${tags.length ? tags.join(',') + ',' : ''}.${name} {\n${registry[name].cssText}\n}\n`
				: '';
		})
		.join('')
	;
}

export default function css(rules) {
	const exports = {};

	Object.keys(rules).forEach(name => {
		const rule = computeRule(name, rules[name]);

		if (isRuleForTag(name)) {
			useRule(rule, name.replace(R_TAG, '$1'));
		} else {
			Object.defineProperty(exports, name, {
				get() {
					rule.used || useRule(rule);
					return process.env.NODE_ENV !== 'production' ? ` ${name}[ ${rule.name} ]` : rule.name;
				}
			});
		}
	});

	return exports;
}
