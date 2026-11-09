// Owner: Ngoc Pham

function normalizeProductText(value) {
	return String(value ?? '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[đĐ]/g, character => character === 'đ' ? 'd' : 'D')
		.toLowerCase()
		.trim();
}

function getProductList(list) {
	return Array.isArray(list) ? list : [];
}

function hasFilterValue(value) {
	return value !== undefined && value !== null && value !== '' && normalizeProductText(value) !== 'all';
}

function searchProducts(list, keyword) {
	const productsToSearch = getProductList(list);
	const normalizedKeyword = normalizeProductText(keyword);

	if (!normalizedKeyword) return productsToSearch.slice();
	return productsToSearch.filter(product => normalizeProductText(product.name).includes(normalizedKeyword));
}

function filterByType(list, type) {
	const productsToFilter = getProductList(list);
	if (!hasFilterValue(type)) return productsToFilter.slice();

	const normalizedType = normalizeProductText(type);
	return productsToFilter.filter(product => normalizeProductText(product.type) === normalizedType);
}

function filterByCategory(list, category) {
	const productsToFilter = getProductList(list);
	if (!hasFilterValue(category)) return productsToFilter.slice();

	const normalizedCategory = normalizeProductText(category);
	return productsToFilter.filter(product => normalizeProductText(product.category) === normalizedCategory);
}

function filterBySpecies(list, species) {
	const productsToFilter = getProductList(list);
	if (!hasFilterValue(species)) return productsToFilter.slice();

	const normalizedSpecies = normalizeProductText(species);
	const speciesAliases = {
		cho: 'dog',
		dog: 'dog',
		meo: 'cat',
		cat: 'cat'
	};
	const targetSpecies = speciesAliases[normalizedSpecies] || normalizedSpecies;

	return productsToFilter.filter(product => {
		const productSpecies = normalizeProductText(product.species);
		return productSpecies === 'all' || productSpecies === targetSpecies;
	});
}

function filterByPrice(list, minPrice, maxPrice, maxPriceExclusive = false, minPriceExclusive = false) {
	const productsToFilter = getProductList(list);
	if (minPrice && typeof minPrice === 'object') {
		maxPriceExclusive = minPrice.maxPriceExclusive ?? minPrice.maxExclusive ?? maxPriceExclusive;
		minPriceExclusive = minPrice.minPriceExclusive ?? minPrice.minExclusive ?? minPriceExclusive;
		maxPrice = minPrice.maxPrice ?? minPrice.max;
		minPrice = minPrice.minPrice ?? minPrice.min;
	}

	const minimum = minPrice === undefined || minPrice === null || minPrice === '' ? -Infinity : Number(minPrice);
	const maximum = maxPrice === undefined || maxPrice === null || maxPrice === '' ? Infinity : Number(maxPrice);

	return productsToFilter.filter(product => {
		const price = Number(product.price);
		const aboveMinimum = minPriceExclusive ? price > minimum : price >= minimum;
		const belowMaximum = maxPriceExclusive ? price < maximum : price <= maximum;
		return Number.isFinite(price) && aboveMinimum && belowMaximum;
	});
}

function sortProducts(list, mode) {
	const productsToSort = getProductList(list).slice();

	switch (mode) {
		case 'price-asc':
			return productsToSort.sort((first, second) => Number(first.price) - Number(second.price));
		case 'price-desc':
			return productsToSort.sort((first, second) => Number(second.price) - Number(first.price));
		case 'name-asc':
			return productsToSort.sort((first, second) =>
				String(first.name ?? '').localeCompare(String(second.name ?? ''), 'vi', { sensitivity: 'base' })
			);
		default:
			return productsToSort;
	}
}

function applyFilters(list, criteria = {}) {
	const options = criteria || {};
	let filteredProducts = getProductList(list).slice();

	if (hasFilterValue(options.type)) filteredProducts = filterByType(filteredProducts, options.type);
	if (hasFilterValue(options.category)) filteredProducts = filterByCategory(filteredProducts, options.category);
	if (hasFilterValue(options.species)) filteredProducts = filterBySpecies(filteredProducts, options.species);
	if (options.minPrice !== undefined || options.maxPrice !== undefined) {
		filteredProducts = filterByPrice(filteredProducts, options.minPrice, options.maxPrice, options.maxPriceExclusive, options.minPriceExclusive);
	}
	if (hasFilterValue(options.keyword)) filteredProducts = searchProducts(filteredProducts, options.keyword);
	if (hasFilterValue(options.sort)) filteredProducts = sortProducts(filteredProducts, options.sort);

	return filteredProducts;
}
