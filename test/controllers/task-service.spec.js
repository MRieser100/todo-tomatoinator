/** TODO: Refactor this to utilize for Task Service (borrowed from NW AngularJS Tutorial) */
import angular from 'angular';
import 'angular-mocks';
import lab11App from '../../src/app';

const {inject, module} = angular.mock;
const mockProfile = {
  username: 'mewdriller',
  lastQuery: 'angular',
};

describe('HomeController', () => {
  let $state;
  let vm;

  beforeEach(module(lab11App));

  beforeEach(inject((_$state_, $controller) => {
    $state = _$state_;
    spyOn($state, 'go');

    vm = $controller('HomeController', {
      $state,
      profile: mockProfile,
    });
  }));

  it('should be registered', () => {
    expect(vm).toBeDefined();
  });

  it('should set the username property', () => {
    expect(vm.username).toEqual(mockProfile.username);
  });

  it('should set the query property', () => {
    expect(vm.query).toEqual(mockProfile.lastQuery);
  });

  describe('.handleKeyup()', () => {
    beforeEach(() => {
      spyOn(vm, 'handleSearch');
    });

    it('should trigger search when Enter is released', () => {
      vm.handleKeyup({keyCode: 13});

      expect(vm.handleSearch).toHaveBeenCalled();
    });

    it('should not trigger search when another key is released', () => {
      vm.handleKeyup({keyCode: 12});

      expect(vm.handleSearch).not.toHaveBeenCalled();
    });
  });

  describe('.handleSearch()', () => {
    it('should transition to the `search` state', () => {
      vm.handleSearch();

      expect($state.go).toHaveBeenCalledWith('search', {query: 'angular'});
    });
  });
});
