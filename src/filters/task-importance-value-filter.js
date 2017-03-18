function taskImportanceValueFilter() {
    'ngInject';

    // TODO: (IDEA) - allow addition of keyword param 'words' to specify words instead of A-D
    return (subtype) => {        
        switch( Number(subtype) )  {
            case 1:
                return 'A';
            case 2:
                return 'B';
            case 3: 
                return 'C';
            case 4:
                return 'D';
            default:
                return '?';
        }        
    }
}

export default taskImportanceValueFilter;
