import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

const baseUrl = 'http://localhost:58112'; // Replace with your URL

/*
// Full html page report
test.describe('Accessibility Tests', () => {
  test('Homepage should not have detectable accessibility violations', async ({ page }) => {
    await page.goto(baseUrl);
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    }, true, 'html', {
        outputDirPath: 'test-results',
        reportFileName: 'accessibility-report.html'
    });
  });
});
*/


// Only console report
test.describe('Accessibility Tests 2', () => {
  test('Homepage should not have detectable accessibility violations', async ({ page }) => {
    await page.goto(baseUrl);
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
});


