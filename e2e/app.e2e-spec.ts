import { ExpensesManagerViewerPage } from './app.po';

describe('expenses-manager-viewer App', function() {
  let page: ExpensesManagerViewerPage;

  beforeEach(() => {
    page = new ExpensesManagerViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
