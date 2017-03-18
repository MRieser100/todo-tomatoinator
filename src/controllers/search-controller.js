function SearchController(SearchService, query, searchResults) {
  'ngInject';

  const vm = this;
  vm.results = searchResults;

  vm.handleRefresh = () => {
    vm.results = [];

    SearchService.search(query)
      .then((results) => vm.results = results);
  };
}

export default SearchController;
