import Block from '@exility/block';
import {isolate, observable, Observer} from 'elastin';

if (process.env.RUN_AT !== 'server') {
	const originCreateView = Block.createView;

	Block.createView = isolate((block, template, scope, options) =>
		new Observer(() => {
			if (block.__view__) {
				block.forceUpdate();
			} else {
				return originCreateView(block, template, scope, options)
			}
		}).call()
	);
}

export function getGlobalData(url) {
	return observable({
		title: 'Artifact scaffold',
		header: 'ARTIFACT',
		request: url,
	});
}
