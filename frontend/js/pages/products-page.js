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

function populateProductCategories(list, type = '', keepValue = '') {
  const categorySelect = document.getElementById('product-category');
  if (!categorySelect) return;

  // Chỉ lấy danh mục của đúng loại đang chọn (rỗng = tất cả), giữ thứ tự trong dữ liệu
  const categories = [...new Set(
    list.filter(product => !type || product.type === type)
        .map(product => product.category)
        .filter(Boolean)
  )];

  categorySelect.replaceChildren(new Option(
    type === 'service' ? 'Tất cả danh mục dịch vụ'
      : type === 'product' ? 'Tất cả danh mục sản phẩm'
      : 'Tất cả danh mục', ''));
  categories.forEach(category => categorySelect.add(new Option(category, category)));

  // Giữ lại danh mục đang chọn nếu vẫn thuộc loại này, không thì về "Tất cả"
  categorySelect.value = categories.includes(keepValue) ? keepValue : '';
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

  // 3b. Nút "Thêm vào giỏ": dùng event delegation vì danh sách được render lại khi tìm kiếm
 
    // 3b. Nút "Thêm vào giỏ": dùng event delegation vì danh sách được render lại khi tìm kiếm
  const productListEl = document.getElementById('product-list');
  if (productListEl) {
    productListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-cart');
      if (!btn) return;

      const ok = typeof addToCart === 'function' && addToCart(Number(btn.dataset.productId), 1);

      if (!btn.dataset.label) btn.dataset.label = btn.textContent;
      btn.textContent = ok ? 'Đã thêm ✓' : 'Không thêm được';
      clearTimeout(btn._resetTimer);
      btn._resetTimer = setTimeout(() => {
        btn.textContent = btn.dataset.label;
      }, 1200);
    });
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
    if (event.target.id === 'product-type') {
      const category = document.getElementById('product-category')?.value || '';
      populateProductCategories(allProducts, event.target.value, category);
    }
    if (productSelectFilterIds.has(event.target.id)) renderFilteredProducts();
  });

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest('#clear-product-filters')) {
      productFilterIds.forEach(id => {
              populateProductCategories(allProducts);
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
        if (key === 'type') populateProductCategories(allProducts);

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

