const DRAWER_EXPANDED_KEY = 'drawerExpanded';

export const LocalStorageService = {
    getDrawerExpansionState,
    setDrawerExpansionState,
};

function getDrawerExpansionState(): boolean {
    const expansionState = localStorage.getItem(DRAWER_EXPANDED_KEY);
    return expansionState ? expansionState === 'true' : true;
}

function setDrawerExpansionState(expanded: boolean): void {
    localStorage.setItem(DRAWER_EXPANDED_KEY, expanded ? 'true' : 'false');
}
