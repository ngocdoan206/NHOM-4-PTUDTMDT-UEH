// Owner: Ngoc Pham
const productFilterIds = new Set([
  'search-input',
  'product-type',
  'product-category',
  'product-species',
  'product-price-range',
  'product-sort'
]);

const productSelectFilterIds = new Set([
  'product-type',
  'product-category',
  'product-species',
  'product-price-range',
  'product-sort'
]);

function readProductFilterCriteria() {
  const priceRangeSelect = document.getElementById('product-price-range');
  const priceRange = priceRangeSelect?.value || '';
  let priceBounds = {};

  if (priceRange.endsWith('+')) {
    priceBounds = { minPrice: Number(priceRange.slice(0, -1)) };
  } else if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);
    priceBounds = { minPrice, maxPrice };
  }

  return {
    type: document.getElementById('product-type')?.value || '',
    category: document.getElementById('product-category')?.value || '',
    species: document.getElementById('product-species')?.value || '',
    priceRange,
    priceRangeLabel: priceRangeSelect?.selectedOptions[0]?.textContent || '',
    ...priceBounds,
    keyword: document.getElementById('search-input')?.value || '',
    sort: document.getElementById('product-sort')?.value || ''
  };
}

function populateProductCategories(list) {
  const categorySelect = document.getElementById('product-category');
  if (!categorySelect) return;

  const categories = [...new Set(list.map(product => product.category).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second, 'vi'));

  categorySelect.replaceChildren(new Option('Tất cả danh mục', ''));
  categories.forEach(category => categorySelect.add(new Option(category, category)));
}

function renderActiveProductFilters(criteria) {
  const activeFilters = document.getElementById('active-filter-list');
  const clearButton = document.getElementById('clear-product-filters');
  if (!activeFilters || !clearButton) return;

  const selected = [];
  if (criteria.type) {
    selected.push({ key: 'type', label: criteria.type === 'service' ? 'Dịch vụ' : 'Sản phẩm' });
  }
  if (criteria.category) selected.push({ key: 'category', label: criteria.category });
  if (criteria.species) selected.push({ key: 'species', label: criteria.species === 'dog' ? 'Chó' : 'Mèo' });
  if (criteria.priceRange) selected.push({ key: 'price', label: criteria.priceRangeLabel });
  if (criteria.keyword.trim()) selected.push({ key: 'keyword', label: `Từ khóa: ${criteria.keyword.trim()}` });
  if (criteria.sort) {
    const sortLabels = {
      'price-asc': 'Giá tăng dần',
      'price-desc': 'Giá giảm dần',
      'name-asc': 'Tên A–Z'
    };
    selected.push({ key: 'sort', label: sortLabels[criteria.sort] || criteria.sort });
  }

  activeFilters.replaceChildren();
  selected.forEach(filter => {
    const chip = document.createElement('span');
    chip.className = 'active-filter-chip';

    const label = document.createElement('span');
    label.textContent = filter.label;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.dataset.removeFilter = filter.key;
    removeButton.setAttribute('aria-label', `Bỏ bộ lọc ${filter.label}`);
    removeButton.textContent = '×';

    chip.append(label, removeButton);
    activeFilters.append(chip);
  });
  clearButton.disabled = selected.length === 0;
}

document.addEventListener('DOMContentLoaded', () => {
  const allProducts = typeof products !== 'undefined' ? products : [];
  const urlParams = new URLSearchParams(window.location.search);
  const searchInput = document.getElementById('search-input');

  if (searchInput && urlParams.has('q')) {
    searchInput.value = urlParams.get('q') || '';
  }

  populateProductCategories(allProducts);

  const renderFilteredProducts = () => {
    const criteria = readProductFilterCriteria();
    renderProducts(applyFilters(allProducts, criteria));
    renderActiveProductFilters(criteria);
  };

  document.addEventListener('input', event => {
    if (productFilterIds.has(event.target.id) && !productSelectFilterIds.has(event.target.id)) {
      renderFilteredProducts();
    }
  });

  document.addEventListener('change', event => {
    if (productSelectFilterIds.has(event.target.id)) renderFilteredProducts();
  });

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest('#clear-product-filters')) {
      productFilterIds.forEach(id => {
        const control = document.getElementById(id);
        if (control) control.value = '';
      });
      const params = new URLSearchParams(window.location.search);
      params.delete('q');
      const query = params.toString();
      window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
      renderFilteredProducts();
      return;
    }

    const removeButton = target.closest('[data-remove-filter]');
    if (!removeButton) return;

    const key = removeButton.dataset.removeFilter;
    const controlsByFilter = {
      type: ['product-type'],
      category: ['product-category'],
      species: ['product-species'],
      price: ['product-price-range'],
      keyword: ['search-input'],
      sort: ['product-sort']
    };
    (controlsByFilter[key] || []).forEach(id => {
      const control = document.getElementById(id);
      if (control) control.value = '';
    });

    if (key === 'keyword') {
      const params = new URLSearchParams(window.location.search);
      params.delete('q');
      const query = params.toString();
      window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
    }
    renderFilteredProducts();
  });

  renderFilteredProducts();
});

