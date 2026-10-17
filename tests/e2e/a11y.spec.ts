import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routesToAudit = [
  '/',
  '/about',
  '/work',
  '/work/persogithub',
  '/education',
  '/content',
  '/speaking',
  '/not-found',
];

test.describe('Automated Accessibility Audits (axe-core)', () => {
  for (const route of routesToAudit) {
    test(`Route "${route}" should have 0 critical or serious a11y violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const seriousOrCriticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );

      expect(seriousOrCriticalViolations).toEqual([]);
    });
  }
});

