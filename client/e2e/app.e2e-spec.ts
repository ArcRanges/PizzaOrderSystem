import { Lab2Page } from './app.po';

describe('lab2 App', () => {
  let page: Lab2Page;

  beforeEach(() => {
    page = new Lab2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
