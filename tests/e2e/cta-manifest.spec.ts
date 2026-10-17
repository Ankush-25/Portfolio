import { test, expect } from '@playwright/test';
import { ctaManifest } from '../../src/content/cta-manifest';

test.describe('CTA Manifest Parameterized Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  for (const cta of ctaManifest) {
    test(`CTA [${cta.id}]: "${cta.label}" -> ${cta.target}`, async ({ page }) => {
      // Find element by selector
      const locator = page.locator(cta.selector);
      await expect(locator).toBeAttached();

      if (cta.type === 'anchor') {
        // Verify href or target attribute
        const href = await locator.getAttribute('href');
        expect(href).toContain(cta.expectedUrlOrHash);

        if (cta.id === 'skip-to-content') {
          // Focus and test skip link behavior
          await locator.focus();
          await locator.click();
          await page.waitForTimeout(300);
          const activeId = await page.evaluate(() => document.activeElement?.id);
          expect(activeId).toBe('main');
        }
      } else if (cta.type === 'internal-route') {
        const href = await locator.getAttribute('href');
        expect(href).toBe(cta.expectedUrlOrHash);

        // Click and verify route change
        await Promise.all([
          page.waitForURL((url) => url.pathname.includes(cta.target.split('#')[0])),
          locator.click(),
        ]);
        expect(page.url()).toContain(cta.target.split('#')[0]);
      } else if (cta.type === 'external-newtab') {
        const href = await locator.getAttribute('href');
        expect(href).toBe(cta.expectedUrlOrHash);

        if (!href?.startsWith('mailto:')) {
          const target = await locator.getAttribute('target');
          const rel = await locator.getAttribute('rel');
          expect(target).toBe('_blank');
          expect(rel).toContain('noopener');
        }
      }
    });
  }
});

